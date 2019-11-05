"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const debug_1 = require("debug");
const path = require("path");
const pack = require("../package.json");
const d = debug_1.default(pack.name + ':' + path.basename(__filename));
const Schema = mongoose.Schema;
exports.mediaSchema = new Schema({
    s3: Object,
    origin: String
});
exports.mediaSchema.pre('save', function () {
    d('media save!');
});
// Subdocument pre-remove middleware
exports.mediaSchema.pre('remove', function (next) {
    console.log('Subdoc pre-remove middleware has fired!');
    next();
});
exports.mediaSchema.pre('findOneAndRemove', function (next) {
    console.log('Subdoc pre-remove middleware has fired!');
    next();
});
exports.mediaSchema.post('remove', function () {
    d('media remove!');
});
exports.mediaSchema.post('findOneAndRemove', function () {
    d('media findOne and Remove!');
});
function userTypeGuard(user) {
    if (user._id) {
        return true;
    }
    else {
        return false;
    }
}
exports.userTypeGuard = userTypeGuard;
exports.itemSchema = new Schema({
    id_num: Number,
    id: { type: String, unique: true },
    text: String,
    attachment: [{
            display_url: String,
            media_url_https: String,
            src: String,
            media: exports.mediaSchema,
            mediatype: String // don't use 'type' instead of 'mediatype' ... it's reserved key by mongoose
        }],
    links: [{
            url: String,
            expanded_url: String,
            display_url: String,
            indices: Array,
            meta: Object,
            media: exports.mediaSchema
        }],
    departedAt: Date,
    index: {
        cat: { type: [String], index: true },
        category: String,
        intent: { type: [String], index: true },
        lang: { type: [String], index: true },
        language: String //depreciated
    },
    suspended: { cat: [String] },
    activated: Boolean,
    retweetid: String,
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
}, {
    timestamps: true
});
exports.itemSchema.index({ text: 'text' });
// Find All
exports.itemSchema.statics.findAll = function () {
    // return promise
    // V4부터 exec() 필요없음
    return this.find({});
};
// for normal list view
exports.itemSchema.statics.list = async function (query, count, skip) {
    let queryObj = query;
    queryObj.activated = true;
    let docs = this.find(queryObj)
        .sort({ 'departedAt': -1 }).skip(skip)
        .limit(count + 1).populate('_user');
    //let cursor = docs.cursor();
    let res = await docs.exec();
    let list = res.slice(0, count); // array[0]번째부터 ~ count개
    let next = res.slice(count); // array[count] 번째부터 ~끝까지
    //let next = await cursor.next();
    return { list: list, next: next };
};
//18.11.20 검색기능
/**
 * @param keyString String
 * @param condition Object
 * @param skipNum Number
 * @param resultSize Number
 */
exports.itemSchema.statics.search = async function (keyString, condition, count, skipNum) {
    let condObj = condition;
    condObj.activated = true; //activated 되어있는 item만
    console.log('keyString:', keyString);
    if (keyString) {
        condObj.$text = { $search: keyString };
    }
    let query = this.find(condObj).sort({ 'departedAt': -1 }).skip(skipNum).limit(count * 2).populate('_user');
    let res = await query.exec();
    let list = res.slice(0, count); // array[0]번째부터 ~ count개
    let next = res.slice(count); // array[count] 번째부터 ~끝까지
    //let next = await cursor.next();
    return { list: list, next: next };
};
/* itemSchema.pre('find', function() {
  this.populate('user');
}); */
exports.itemSchema.post('save', function (doc) {
    d(`${doc.id} has been saved`);
    return doc;
});
exports.itemSchema.post('remove', function (doc) {
    d(`${doc.id} has been removed`);
    return doc;
});
exports.itemSchema.post('findOneAndRemove', function (doc) {
    d(`${doc.id} has been removed`);
    return doc;
});
exports.default = mongoose.model('Item', exports.itemSchema);
//# sourceMappingURL=model.item.js.map