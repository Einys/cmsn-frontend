export { }

import * as mongoose from 'mongoose';
import * as item from './model.item'
import * as user from './model.user'

const Schema = mongoose.Schema;

export interface IReq {
  id?: string, //of twitter
  userid?: string, //of twitter
  username?: string,
  text?: string,
  itemid?: string,
  _item?: item.ItemDoc['_id'],
  _user?: user.UserDoc['_id'],
  result?: executionResult,
  target?: {botID:string, retweetID?:string, filter?:any, error?:any}[],
  createdAt?: Date,
  updatedAt?: Date
}

export type reqDoc = IReq & mongoose.Document

export type executionResult = {
  error?: any,
  success: boolean,
  filter? :any,
  retweetID?: string // id of retweet;
}

export const reqSchema = new Schema({
  id: String, //of twitter
  userid: String, //of twitter, cmsn
  username: String,
  text: String,
  itemid: String,
  _item: { type: Schema.Types.ObjectId, ref: 'Item' },
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
  result: Object,
  target: [Object]
}, {
    timestamps: true
  });


reqSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 14 });

import debug from 'debug';
import * as path from 'path'
import * as pack from '../package.json';
const d = debug(pack.name + ':' + path.basename(__filename))

reqSchema.post('save', function (doc) {
  d(`${doc.id} has been saved`)
  return doc
});
reqSchema.post('remove', function (doc) {
  d(`${doc.id} has been removed`)
  return doc
});
export default mongoose.model<reqDoc>('Req', reqSchema);



