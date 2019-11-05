import * as mongoose from 'mongoose';
export declare type userReason = 'toomuch' | 'copyright' | 'rude' | 'spam';
export declare type itemReason = 'porn' | 'misuse';
export declare type reason = userReason | itemReason;
export interface IReport {
    sender_user?: string;
    target_item: string;
    target_user?: string;
    target_username?: string;
    reason?: reason;
    effected?: boolean;
    ref?: any;
}
export declare type reportDoc = IReport & mongoose.Document;
declare const _default: mongoose.Model<reportDoc, {}>;
export default _default;
