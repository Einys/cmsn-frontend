"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
/**
 * 블랙리스트
 * item id는 필수로 있으며
 * user id는 유저를 블랙리스팅할때만 있다
 */
const debug_1 = require("debug");
const path = require("path");
const pack = require("../package.json");
const d = debug_1.default(pack.name + ':' + path.basename(__filename));
exports.blacklistSchema = new Schema({
    userid: String,
    username: String,
    itemid: String,
    reason: String,
    type: String,
    expiredAt: Date
}, {
    timestamps: true
});
exports.blacklistSchema.index({ expiredAt: 1 }, { expireAfterSeconds: 0 });
exports.blacklistSchema.post('save', function (doc) {
    d(`${doc.id} has been saved`);
    return doc;
});
exports.blacklistSchema.post('remove', function (doc) {
    d(`${doc.id} has been removed`);
    return doc;
});
exports.default = mongoose.model('Blacklist', exports.blacklistSchema);
//# sourceMappingURL=model.blacklist.js.map