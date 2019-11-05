/// <reference types="node" />
import * as aws from 'aws-sdk';
import * as Item from './model.item';
export default class mediaS3 {
    bucket: string;
    s3: aws.S3;
    constructor(options: {
        auth: {
            key: string;
            secret: string;
        };
        region: string;
        bucket: string;
    });
    /**
        * go to link, save image into my s3, and save s3 keys into my database, and return database data
    */
    storeMediaByLink(mediaLink: string, options?: {
        thumb?: boolean;
        small?: boolean;
    }): Promise<Item.mediaDoc>;
    storeThumb(mediaLink: string): Promise<{
        key: string;
        location: string;
    }>;
    /**
     * Item attachment 나 link 의 media 객체를 받아서 모든 flag(small, thumb 등)의 키를 가지고 s3 삭제 요청을 한다.
     * return : example - {small: (some result data), thumb: (some result data) }
     * @param media
     */
    deleteMedia(media: Item.mediaDoc): Promise<any>;
    deleteByKey(key: any): Promise<import("aws-sdk/lib/request").PromiseResult<aws.S3.DeleteObjectOutput, aws.AWSError>>;
    storeSmall(mediaLink: string): Promise<{
        w: any;
        h: any;
        key: string;
        location: string;
    }>;
    makeDummys(): void;
}
/**
 * resize a image from src
 * @param {} imageSrc
 * @param {*} size
 * @param {*} jpegQuality
 */
export declare function jimpImg(imageSrc: any, size: any, jpegQuality: any): Promise<any>;
/**
 * make square image from src
 * @param {} imageSrc
 * @param {*} size
 * @param {*} jpegQuality
 */
export declare function thumbImg(imageSrc: any, size: any, jpegQuality: any): Promise<{
    ok: boolean;
    w: number;
    h: number;
    buffer: Buffer;
    originalName: string;
    ext: string;
}>;
