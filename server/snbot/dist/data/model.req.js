"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
exports.reqSchema = new Schema({
    id: String,
    userid: String,
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
exports.reqSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 14 });
const debug_1 = require("debug");
const path = require("path");
const pack = require("../package.json");
const d = debug_1.default(pack.name + ':' + path.basename(__filename));
exports.reqSchema.post('save', function (doc) {
    d(`${doc.id} has been saved`);
    return doc;
});
exports.reqSchema.post('remove', function (doc) {
    d(`${doc.id} has been removed`);
    return doc;
});
exports.default = mongoose.model('Req', exports.reqSchema);
//# sourceMappingURL=model.req.js.map