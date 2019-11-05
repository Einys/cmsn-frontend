

import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export type userReason = 'toomuch'|'copyright'|'rude'|'spam'
export type itemReason = 'porn'|'misuse'
export type reason = userReason | itemReason

export interface IReport {
    sender_user?: string, //numeric id of twitter
    target_item: string, //tweet id of twitter
    target_user?: string,
    target_username?: string,
    reason? : reason,
    effected? : boolean,
    ref?: any
}

export type reportDoc = IReport & mongoose.Document

const reportSchema = new Schema({
    sender_user: String, //numeric id of twitter
    target_item: String, //tweet id of twitter
    target_user: String,
    target_username: String,
    reason : String,
    effected : Boolean,
    ref: Schema.Types.Mixed
},{
    timestamps: true
});

reportSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60*60*24*90 });

/*
reportSchema.statics.aggregateReasonByItem = function ( itemid ) {
    // return promise
    // V4부터 exec() 필요없음
    const aggregatorOpts = [
        
        {$match:
            {'target_pr': itemid }
        },

        {
        $group: {
          _id: "$reason",
          count: { $sum: 1 }
        }
      }]
      
    return this.aggregate(aggregatorOpts);

};
*/

import debug from 'debug';
import * as path from 'path'
import * as pack from '../package.json';
const d = debug(pack.name + ':' + path.basename(__filename))

reportSchema.post('save', function (doc) {
    d(`${doc.id} has been saved`)
    return doc
});
reportSchema.post('remove', function (doc) {
    d(`${doc.id} has been removed`)
    return doc
});


export default mongoose.model<reportDoc>('Report', reportSchema);
