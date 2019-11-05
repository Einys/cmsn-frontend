"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const debug_1 = require("debug");
const path = require("path");
const pack = require("../package.json");
const d = debug_1.default(pack.name + ':' + path.basename(__filename));
exports.botSchema = new Schema({
    code: String,
    name: String,
    id: String,
    cat: String,
    lang: String,
    keys: {
        consumer: { type: Schema.Types.ObjectId, ref: 'Auth' },
        access: Object
    },
    memo: String,
    threadOption: Schema.Types.Mixed,
    group: Array,
    filterLayers: Array,
    conversationMap: Object,
    s3: {
        auth: { type: Schema.Types.ObjectId, ref: 'Auth' },
        bucket: String,
        region: String
    }
});
exports.botSchema.pre('find', function () {
    this.populate('keys.consumer');
    this.populate('s3.auth');
});
exports.botSchema.pre('findOne', function () {
    this.populate('keys.consumer').populate('s3.auth');
});
exports.default = mongoose.model('Bot', exports.botSchema);
//# sourceMappingURL=model.bot.js.map