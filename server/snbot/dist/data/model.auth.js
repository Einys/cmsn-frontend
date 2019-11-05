"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const authSchema = new Schema({
    key: String,
    secret: String,
    name: String,
    usage: String,
    memo: String,
}, {
    timestamps: true
});
const debug_1 = require("debug");
const path = require("path");
const pack = require("../package.json");
const d = debug_1.default(pack.name + ':' + path.basename(__filename));
authSchema.post('save', function (doc) {
    d(`${doc.id} has been saved`);
    return doc;
});
authSchema.post('remove', function (doc) {
    d(`${doc.id} has been removed`);
    return doc;
});
exports.default = mongoose.model('Auth', authSchema);
//# sourceMappingURL=model.auth.js.map