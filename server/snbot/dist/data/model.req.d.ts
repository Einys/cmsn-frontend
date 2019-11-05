export {};
import * as mongoose from 'mongoose';
import * as item from './model.item';
import * as user from './model.user';
export interface IReq {
    id?: string;
    userid?: string;
    username?: string;
    text?: string;
    itemid?: string;
    _item?: item.ItemDoc['_id'];
    _user?: user.UserDoc['_id'];
    result?: executionResult;
    target?: {
        botID: string;
        retweetID?: string;
        filter?: any;
        error?: any;
    }[];
    createdAt?: Date;
    updatedAt?: Date;
}
export declare type reqDoc = IReq & mongoose.Document;
export declare type executionResult = {
    error?: any;
    success: boolean;
    filter?: any;
    retweetID?: string;
};
export declare const reqSchema: mongoose.Schema<any>;
declare const _default: mongoose.Model<reqDoc, {}>;
export default _default;
