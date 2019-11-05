import * as mongoose from 'mongoose';
import { cat } from './model.item';
import * as filter from '../filter';
import { AuthDoc } from './model.auth';
export declare type threadOption = {
    all: boolean;
    passableIds?: string[];
};
export declare type keys = {
    consumer: AuthDoc['_id'];
    access: {
        token: string;
        secret: string;
    };
};
export interface Ibot {
    _id?: string | Ibot;
    code?: string;
    name?: string;
    id?: string;
    cat?: cat;
    lang?: string;
    keys?: keys;
    memo?: string;
    group?: [string];
    threadOption?: threadOption;
    filterLayers?: filter.filterLayer[];
    conversationMap?: object;
    s3?: {
        auth: AuthDoc['_id'];
        bucket: string;
        region: string;
    };
}
export declare type botDoc = Ibot & mongoose.Document;
export declare const botSchema: mongoose.Schema<any>;
declare const _default: mongoose.Model<botDoc, {}>;
export default _default;
