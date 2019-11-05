"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const reportSchema = new Schema({
    sender_user: String,
    target_item: String,
    target_user: String,
    target_username: String,
    reason: String,
    effected: Boolean,
    ref: Schema.Types.Mixed
}, {
    timestamps: true
});
reportSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 90 });
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
const debug_1 = require("debug");
const path = require("path");
const pack = require("../package.json");
const d = debug_1.default(pack.name + ':' + path.basename(__filename));
reportSchema.post('save', function (doc) {
    d(`${doc.id} has been saved`);
    return doc;
});
reportSchema.post('remove', function (doc) {
    d(`${doc.id} has been removed`);
    return doc;
});
exports.default = mongoose.model('Report', reportSchema);
//# sourceMappingURL=model.report.js.map