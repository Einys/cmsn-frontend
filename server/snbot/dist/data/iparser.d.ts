/**
 * 2019.04.18 타입스크립트
 */
import { attachment } from './model.item';
import * as item from './model.item';
import MediaS3 from './store.media';
export * from './store.media';
export { default as S3 } from './store.media';
export declare const config: {
    saveAttachMedia: boolean;
    saveLinkMedia: boolean;
    saveThumbImage: boolean;
};
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
export declare function parseItemByTweet(itemTweet: any, mediaS3?: MediaS3): Promise<item.ItemDoc>;
export declare function storeMediaByMeta(meta: any, hasNoAttachment: boolean, mediaS3?: MediaS3): Promise<item.mediaDoc>;
/**
 *
 * @param itemTweet
 */
export declare function parseAttachment(itemTweet: any, mediaS3?: MediaS3): Promise<[attachment]>;
/**
 * 링크의 메타데이터를 리턴 {title , image, ...}
 * @param {String} link
 */
export declare function parseLinkMeta(link: string): Promise<{
    title: any;
    description: any;
    'twitter:card': any;
    image: any;
}>;
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
export declare function parseMetaTCardImage(link: any): Promise<{
    title: any;
    description: any;
    'twitter:card': any;
    image: any;
    rawImage: string;
}>;
export declare function jimpImg(imageSrc: string, width: number, jpegQuality: number): Promise<any>;
export declare function initMstore(): void;
