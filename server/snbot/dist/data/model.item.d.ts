import * as mongoose from 'mongoose';
import { UserDoc } from './model.user';
export declare type attachment = {
    display_url?: string;
    media_url_https?: string;
    src: string;
    mediatype?: string;
    media?: mediaDoc;
};
export declare type s3key = {
    small?: {
        w?: number;
        h?: number;
        key?: string;
        location?: string;
    };
    thumb?: {
        key?: string;
        location?: string;
    };
};
export interface mediaDoc extends mongoose.Document {
    s3?: s3key;
    origin: string;
}
export declare const mediaSchema: mongoose.Schema<any>;
export declare type cat = 'all' | 'art' | 'des' | 'wri' | 'mus';
export declare type intent = 'open' | 'find' | 'und';
export declare type link = {
    url?: string;
    expanded_url?: string;
    display_url?: string;
    indices?: Array<any>;
    meta?: {
        title?: string;
        image?: string;
        description?: string;
        'twitter:card'?: string;
    };
    media?: mediaDoc;
};
export interface Iitem {
    _id?: string | Iitem;
    id_num?: number;
    id?: string;
    text?: string;
    attachment?: [attachment];
    links?: [link];
    createdAt?: number;
    updatedAt?: number;
    departedAt?: number;
    index?: {
        cat: cat[];
        category?: string;
        intent: intent[];
        lang: string[];
        language?: string;
    };
    suspended?: {
        cat?: cat[];
    };
    activated?: boolean;
    retweetid?: string;
    _user?: UserDoc['_id'] | UserDoc;
}
export declare type ItemDoc = Iitem & mongoose.Document;
export declare function userTypeGuard(user: any): user is UserDoc;
export declare const itemSchema: mongoose.Schema<any>;
interface itemStatic extends mongoose.Model<ItemDoc> {
    search: (keyString: any, condition: any, resultSize: any, skipNum: any) => Promise<{
        list: any;
        next: any;
    }>;
    list: (query: any, count: any, skip: any) => Promise<{
        list: any;
        next: any;
    }>;
}
declare const _default: itemStatic;
export default _default;
