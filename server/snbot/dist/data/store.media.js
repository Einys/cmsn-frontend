"use strict";
//@ts-check
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require('dotenv');
dotenv.config();
const Jimp = require("jimp");
const aws = require("aws-sdk");
const debug_1 = require("debug");
const path = require("path");
const pack = require("../package.json");
const d = debug_1.default(pack.name + ':' + path.basename(__filename));
class mediaS3 {
    constructor(options) {
        if (!options.auth.key && !options.auth.secret) {
            throw new Error('empty s3 auth key or secret');
        }
        this.s3 = new aws.S3({
            accessKeyId: options.auth.key,
            secretAccessKey: options.auth.secret,
            region: options.region
        });
        this.bucket = options.bucket;
    }
    /**
        * go to link, save image into my s3, and save s3 keys into my database, and return database data
    */
    async storeMediaByLink(mediaLink, options = { thumb: true, small: true }) {
        //저장 예외이면 null 리턴
        //s3에 저장하고 받은 키를 리턴
        //(s3 저장 예외)
        const exception = [
            'd3ntao8dlqowm1.cloudfront',
            '-note-thumbnail.png',
            'avatar/blog_blank',
            'facebook_blank_img.jpg',
            'icon/557567EA016E200001',
            'iopen.kakaocdn.net',
            'post/og_default_image' //naver blog
        ];
        let excepted = exception.some(el => { return mediaLink.includes(el); });
        if (excepted) {
            d('This medialink is an exception : ' + mediaLink);
            return null;
        }
        //S3에 저장한다
        let media = {
            origin: mediaLink
        };
        let s3key = {};
        if (options.small)
            s3key.small = await this.storeSmall(mediaLink);
        if (options.thumb)
            s3key.thumb = await this.storeThumb(mediaLink);
        //S3에 저장한 데이터를 DB document 에 할당한다
        media.s3 = s3key;
        return media;
    }
    async storeThumb(mediaLink) {
        //썸네일 스토어
        const THUMB_SIZE = 125;
        const THUMB_Q = 85;
        const thumb = await thumbImg(mediaLink, THUMB_SIZE, THUMB_Q);
        var thumbParams = {
            'Bucket': this.bucket,
            'ACL': 'public-read',
            'Body': thumb.buffer,
            'Key': 'thumbs/' + Date.now().toString() + '/' + thumb.originalName,
            'ContentType': 'image/jpeg'
        };
        let thumbStored = await this.s3.upload(thumbParams).promise();
        d(thumbStored);
        return { key: thumbStored.Key, location: thumbStored.Location };
    }
    /**
     * Item attachment 나 link 의 media 객체를 받아서 모든 flag(small, thumb 등)의 키를 가지고 s3 삭제 요청을 한다.
     * return : example - {small: (some result data), thumb: (some result data) }
     * @param media
     */
    async deleteMedia(media) {
        if (!media && !media.s3)
            throw new Error('media s3 data must be exist to delete');
        let result = {};
        /**
         * media.s3
         * {
         *  {small: { key: ... }}
         *  {thumb: { key: ... }}
         * }
         */
        Object.keys(media.s3).forEach(flag => {
            let key = media.s3[flag].key;
            result[flag] = this.deleteByKey(key);
        });
        return result;
    }
    async deleteByKey(key) {
        d(`s3 : now delete ${key}`);
        let params = { Bucket: this.bucket, Key: key };
        let res = await this.s3.deleteObject(params).promise();
        return res;
    }
    async storeSmall(mediaLink) {
        //이미지 스몰사이즈 스토어
        const JIMP_SIZE = 360;
        const JIMP_Q = 85;
        const small = await jimpImg(mediaLink, JIMP_SIZE, JIMP_Q);
        var smImageParams = {
            'Bucket': this.bucket,
            'ACL': 'public-read',
            'Body': small.buffer,
            'Key': 'small/' + Date.now().toString() + '/' + small.originalName,
            'ContentType': 'image/jpeg'
        };
        let imageStored = await this.s3.upload(smImageParams).promise();
        d(imageStored);
        return { w: small.w, h: small.h, key: imageStored.Key, location: imageStored.Location };
    }
    makeDummys() {
        const IMG_LINKS = ["https://pbs.twimg.com/media/D55k2hvUUAAfhMs.jpg", "https://pbs.twimg.com/media/D4WzlIdU4AENbQp.png", "https://pbs.twimg.com/media/D4Wzq1kUIAEhCVJ.png", "https://pbs.twimg.com/media/D5xwO1AUcAATSw1.jpg", "https://pbs.twimg.com/media/D46fNvVUYAAZ22h.jpg", "https://pbs.twimg.com/media/DzsREsqUwAAwu3m.jpg", "https://pbs.twimg.com/media/D04OzJuUwAATssy.png", "https://pbs.twimg.com/media/D24nm38U4AAiRIA.jpg", "https://pbs.twimg.com/media/D5kDgCEX4AEwMxR.jpg", "https://pbs.twimg.com/media/Dv95yLGUUAIRupl.jpg", "https://pbs.twimg.com/media/D2rI5tYU0AAdtEF.jpg", "https://pbs.twimg.com/media/D58Z1avVUAA6qC9.jpg", "https://pbs.twimg.com/media/D5P0NJuUUAAJ236.png", "https://pbs.twimg.com/media/D58Xb7nVUAALcCs.jpg"];
        IMG_LINKS.forEach(link => {
            this.storeMediaByLink(link);
        });
    }
}
exports.default = mediaS3;
/**
 * resize a image from src
 * @param {} imageSrc
 * @param {*} size
 * @param {*} jpegQuality
 */
async function jimpImg(imageSrc, size, jpegQuality) {
    console.log('[dataParser.js/jimpImg] Trying to jimp from src:', imageSrc);
    return Jimp.read(imageSrc).then(image => {
        console.log("[dataParser.js] original Image size WH", image.bitmap.width, image.bitmap.height);
        //가로가길면 세로고정값...세로가길면 가로고정값 (즉 가로,세로 둘 다 최소크기를 넘김)
        //throw new Error('test error')
        let resized;
        if (image.bitmap.width > image.bitmap.height) {
            resized = image.resize(Jimp.AUTO, size);
        }
        else {
            resized = image.resize(size, Jimp.AUTO);
        }
        return resized.quality(jpegQuality).getBufferAsync(Jimp.MIME_JPEG).then(buffer => {
            return { ok: true, w: resized.getWidth(), h: resized.getHeight(), buffer: buffer, originalName: path.basename(imageSrc), ext: image.getExtension() };
        });
    }).catch(err => {
        throw err;
    });
}
exports.jimpImg = jimpImg;
/**
 * make square image from src
 * @param {} imageSrc
 * @param {*} size
 * @param {*} jpegQuality
 */
async function thumbImg(imageSrc, size, jpegQuality) {
    console.log('[dataParser.js/jimpImg] Trying to jimp from src:', imageSrc);
    return Jimp.read(imageSrc).then(image => {
        console.log("[dataParser.js] original Image size WH", image.bitmap.width, image.bitmap.height);
        //가로세로 길이가 같은 정사각형 모양을 커버하도록 크롭
        let resized = image.cover(size, size);
        return resized.quality(jpegQuality).getBufferAsync(Jimp.MIME_JPEG).then(buffer => {
            return { ok: true, w: resized.getWidth(), h: resized.getHeight(), buffer: buffer, originalName: path.basename(imageSrc), ext: image.getExtension() };
        });
    }).catch(err => {
        throw err;
    });
}
exports.thumbImg = thumbImg;
//# sourceMappingURL=store.media.js.map