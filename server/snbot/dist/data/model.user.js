"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.userSchema = new mongoose.Schema({
    id: { type: String, unique: true },
    name: String,
    profileName: String,
    profileImg: String,
    profile_img: String,
    email: String,
    sns: String,
    lastVisit: Date,
    _items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
    twitterOauth: Object,
    protected: Boolean,
    admin: Boolean,
    lang: [String]
}, {
    timestamps: true
});
const debug_1 = require("debug");
const path = require("path");
const pack = require("../package.json");
const d = debug_1.default(pack.name + ':' + path.basename(__filename));
exports.userSchema.post('save', function (doc) {
    d(`${doc.id} has been saved`);
    return doc;
});
exports.userSchema.post('remove', function (doc) {
    d(`${doc.id} has been removed`);
    return doc;
});
exports.userSchema.post('update', function (doc) {
    d(`${doc.id} has been removed`);
    return doc;
});
exports.default = mongoose.model('User', exports.userSchema);
//# sourceMappingURL=model.user.js.map