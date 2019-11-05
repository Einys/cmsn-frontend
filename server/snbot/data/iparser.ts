import grabity = require('grabity');
import Jimp = require('jimp');

/**
 * 2019.04.18 타입스크립트
 */

import Item, { attachment, link } from './model.item'
import * as item from './model.item'
import MediaS3, * as mstore from './store.media'
export * from './store.media'
export { default as S3 } from './store.media'

import debug from 'debug';
import * as path from 'path'
import pack = require('../package.json');

const d = debug(pack.name + ':' + path.basename(__filename))

export const config = {
    saveAttachMedia: false,
    saveLinkMedia: true,
    saveThumbImage: false
}

/**
 * 트윗 오브젝트(트윗,+유저)를 -> 이 시스템에 맞게 파싱하는 모듈이다.
 * 
 * 2018.12.29
 * 링크 메타데이터를 간략히 모든 링크에 포함, 
 * 트윗에 이미지가 없고 & 링크메타가 트위터카드 large이미지인경우 jimp 
 * 
 * 2019.05.16 함수명 변경 tweetObjParser => createItemByTweet
 * 업데이트
 * 
 * @param {*} itemTweet 
 */
export async function parseItemByTweet(itemTweet: any, mediaS3?: MediaS3) {

    itemTweet.text = itemTweet.text ? itemTweet.text : itemTweet.full_text

    if (!itemTweet.text) {
        throw new Error('Empty Tweet content cannot be saved!')
    }

    let item = await Item.findOneAndUpdate({ id: itemTweet.id_str }, {}, { upsert: true, new: true })

    item.id_num = itemTweet.id;

    let text = itemTweet.text
    if (typeof text === 'string') {
        let regex = /https?:\/\/[\w\.\/]*/g
        item.text = text.replace(regex, ' ://link')
    }


    d(item.toString())

    let noAttachment: boolean = false
    //이미지 등 미디어 파싱
    if (itemTweet.extended_entities && Array.isArray(itemTweet.extended_entities.media) && itemTweet.extended_entities.media[0]) {
        try {
            //s3스토리지에 저장(mediaS3 파라미터가 비었으면 저장하지 않음)
            item.attachment = await parseAttachment(itemTweet, mediaS3);
        } catch (error) {
            d(error)
        }
    } else {
        noAttachment = true
    }

    //링크가 있는 경우
    if (itemTweet.entities && itemTweet.entities.urls[0]) {
        let urls: [link]
        for (let url of itemTweet.entities.urls) {
            let u: link = url
            //링크의 메타데이터를 가져옴
            u.meta = await parseLinkMeta(url.expanded_url);

            u.media = await storeMediaByMeta(u.meta, noAttachment, mediaS3)

            //url 하나 작업을 완료했으므로 푸쉬
            Array.isArray(urls) ? urls.push(u) : urls = [u]
            d(urls)
        }
        item.links = urls;
    } else {
        d('Not have links');
    }
    await item.updateOne(item)
    return item
}

export function storeMediaByMeta(meta, hasNoAttachment:boolean, mediaS3?: MediaS3) : Promise<item.mediaDoc> {
    //small 이미지를 클라우드스토어에 저장할지 결정함. 미디어 Attachment가 없는경우 또는 메타데이터 summary large image인 경우 저장.
    let shouldSaveSmallImage = hasNoAttachment || meta["twitter:card"] === 'summary_large_image'
    d('Save small Image? ' + shouldSaveSmallImage)
    //meta에 이미지가 있고 & s3가 정의되어 있고 & 옵션으로 LinkMedia 를 save하기로 되어있는 경우 media 데이터 생성
    if ( meta.image && mediaS3 && config.saveLinkMedia){
        return mediaS3.storeMediaByLink(meta.image, { thumb: config.saveThumbImage, small: shouldSaveSmallImage })
    } else{
        return;
    }
}

/**
 * 
 * @param itemTweet 
 */
export async function parseAttachment(itemTweet: any, mediaS3?: MediaS3): Promise<[attachment]> {

    //attachment 형식은 media의 배열
    let attachment: [attachment]
    if (!(itemTweet.extended_entities && itemTweet.extended_entities.media[0]))
        return attachment

    for (const m of itemTweet.extended_entities.media) {
        //하나의 media 파싱
        let one: attachment = {
            display_url: m.display_url,
            src: m.media_url_https,
            mediatype: m.type
        };

        //s3스토리지를 파라미터로 받은 경우 & 저장 여부 옵션 있는 경우 s3에 저장 (저장 여부 옵션 추가됨)
        if (mediaS3 && config.saveAttachMedia) {
            one.media = await mediaS3.storeMediaByLink(one.src)
        }

        //attachment 배열에 푸쉬
        Array.isArray(attachment) ? attachment.push(one) : (attachment = [one])

    }

    return attachment
}

/**
 * 링크의 메타데이터를 리턴 {title , image, ...}
 * @param {String} link 
 */
export async function parseLinkMeta(link: string) {

    let it = await grabity.grab(link)

    let meta = {
        title: it['og:title'] || it['twitter:title'],
        description: it['og:description'] || it['twitter:description'],
        'twitter:card': it['twitter:card'],
        image: it['og:image'] || it['twitter:image:src']
    }
    return meta;

}

/**
 * 링크의 이미지 자체를 웹에 게시해야 할 필요가 있을 때(메인 이미지가 없다거나..) 사용할 함수
 * 트위터 카드가 large image 이면 이미지를 파싱
 * 이미지가 잘 파싱된 경우 객체에 rawImage attr 이 생긴다.
 * 2018.12.19
 * 
 * 2019.05.17
 * 링크의 이미지가 있으면 무조건 cdn 에 저장하므로 더 이상 이 함수는 쓰지 않는다.
 * 
 * @param {String} link 
 * @deprecated Use parseLinkMeta
 */
export async function parseMetaTCardImage(link) {

    let width = 150;
    let jpegQuality = 60;

    let it = await grabity.grab(link).catch(err => { console.log(err) });

    if (it['twitter:card'] === 'summary_large_image') {
        width = 400;
    }

    let meta = {
        title: it['og:title'] || it['twitter:title'],
        description: it['og:description'] || it['twitter:description'],
        'twitter:card': it['twitter:card'],
        image: it['og:image'] || it['twitter:image:src'],
        rawImage: ''
    }

    if (it['twitter:card'] === 'summary_large_image') {
        meta['twitter:card'] = 'summary_large_image'
    }

    if (meta.image && meta['twitter:card']) {

        if (meta.image.includes('evernote') || meta.image.includes('-note-thumbnail.png')) {
            console.log('evernote logo image ');
            //return [{ type: 'photo', src: meta.image, source: 'evernote', media_url_https: meta.image, desc: it.description }];
        } else if (meta.image.includes('avatar/blog_blank') || meta.image.includes('facebook_blank_img.jpg') || meta.image.includes('postype.com')) {
            console.log('postype thumbnail');
            //return [{ type: 'photo', src: meta.image, source: 'postype', media_url_https: meta.image }];   
        }
        else if (meta.image.includes('tistory_admin/static') || meta.image.includes('icon/557567EA016E200001')) {
            console.log('tistory logo image ');
            //return [{ type: 'photo', src: meta.image, source: 'tistory', media_url_https: meta.image }];
        } else if (meta.image.includes('iopen.kakaocdn.net')) {
            console.log('open kakao chat default image ');
        } else if (meta.image.includes('post/og_default_image')) {
            console.log('naver blog default image ');
        } else {
            meta.rawImage = await jimpImg(meta.image, width, jpegQuality).catch(err => { console.log(err) })
        }

    }

    return meta;
}


export function jimpImg(imageSrc: string, width: number, jpegQuality: number) {

    console.log('[dataParser.js/jimpImg] Trying to jimp from src:', imageSrc);

    return Jimp.read(imageSrc).then(image => {
        console.log("[dataParser.js] jimp Image size WH", image.bitmap.width, image.bitmap.height)
        //가로가길면 가로고정값...세로가길면 세로고정값
        if (image.bitmap.width > image.bitmap.height) {
            return image.resize(width, Jimp.AUTO).quality(jpegQuality).getBase64Async(Jimp.MIME_JPEG)
        } else {
            return image.resize(Jimp.AUTO, width).quality(jpegQuality).getBase64Async(Jimp.MIME_JPEG)
        }
    }).then(buffer => {
        console.info('[dataParser.js] Jimped Image');
        return buffer //[{ type: 'photo', src: buffer, source: 'base64', media_url_https: it.image }]; // media_url_https depreciated
        //console.log('<img src="'+buffer+'">');
    }).catch(err => {
        console.error(err);
        return null;
    })

}

export function initMstore() {
    //todo: general store 초기화하기
}