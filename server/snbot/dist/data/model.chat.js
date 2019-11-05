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
exports.chatSchema = new Schema({
    targetID: String,
    senderID: String,
    content: mongoose.Schema.Types.Mixed
}, {
    timestamps: { createdAt: true, updatedAt: false }
});
exports.chatSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 30 });
exports.chatSchema.post('save', function (doc) {
    d(`${doc.id} has been saved`);
    return doc;
});
exports.chatSchema.post('remove', function (doc) {
    d(`${doc.id} has been removed`);
    return doc;
});
exports.default = mongoose.model('Chat', exports.chatSchema);
//# sourceMappingURL=model.chat.js.map