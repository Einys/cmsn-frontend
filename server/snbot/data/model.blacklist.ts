import * as mongoose from 'mongoose';
import {cat} from './model.item'
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

export interface Iblacklist {
    userid?: string,
    username?: string,
    itemid?: string,
    reason?: string,
    type?: 'user' | 'item'
    expiredAt?: Date
}

export type blacklistDoc = Iblacklist & mongoose.Document

export const blacklistSchema = new Schema({
    userid: String,
    username: String,
    itemid: String,
    reason: String,
    type: String,
    expiredAt: Date
}, {
        timestamps: true
    })
blacklistSchema.index({ expiredAt: 1 }, { expireAfterSeconds: 0 });

blacklistSchema.post('save', function (doc) {
    d(`${doc.id} has been saved`)
    return doc
  });
blacklistSchema.post('remove', function (doc) {
    d(`${doc.id} has been removed`)
    return doc
  });
export default mongoose.model<blacklistDoc>('Blacklist', blacklistSchema);
