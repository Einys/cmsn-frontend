import * as mongoose from 'mongoose';
export interface Iblacklist {
    userid?: string;
    username?: string;
    itemid?: string;
    reason?: string;
    type?: 'user' | 'item';
    expiredAt?: Date;
}
export declare type blacklistDoc = Iblacklist & mongoose.Document;
export declare const blacklistSchema: mongoose.Schema<any>;
declare const _default: mongoose.Model<blacklistDoc, {}>;
export default _default;
