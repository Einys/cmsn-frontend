import * as mongoose from 'mongoose';
import { UserDoc } from './model.user'
const Schema = mongoose.Schema;

/**
 * 블랙리스트
 * item id는 필수로 있으며
 * user id는 유저를 블랙리스팅할때만 있다
 */

import debug from 'debug';
import * as path from 'path'
import * as pack from '../package.json';
const d = debug(pack.name + ':' + path.basename(__filename))

export interface IChat {
    targetID: string,
    senderID: string,
    content: content,
    createdAt?: Date
}

export type chatDoc = IChat & mongoose.Document

export type content = {
    [key: string]: any,
    text?: string,
    reportedItemID? : string
}

export const chatSchema = new Schema({
    targetID: String,
    senderID: String,
    content: mongoose.Schema.Types.Mixed
}, {
        timestamps: {createdAt: true, updatedAt: false}
    })
chatSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 30 });

chatSchema.post('save', function (doc) {
    d(`${doc.id} has been saved`)
    return doc
});
chatSchema.post('remove', function (doc) {
    d(`${doc.id} has been removed`)
    return doc
});
export default mongoose.model<chatDoc>('Chat', chatSchema);
