import * as mongoose from 'mongoose';
export interface IChat {
    targetID: string;
    senderID: string;
    content: content;
    createdAt?: Date;
}
export declare type chatDoc = IChat & mongoose.Document;
export declare type content = {
    [key: string]: any;
    text?: string;
    reportedItemID?: string;
};
export declare const chatSchema: mongoose.Schema<any>;
declare const _default: mongoose.Model<chatDoc, {}>;
export default _default;
