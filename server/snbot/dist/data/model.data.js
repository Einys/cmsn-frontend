"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const dataSchema = new Schema({
    index: String,
    data: Schema.Types.Mixed
});
dataSchema.statics.findbyIndex = function (index) {
    return this.findOne({ index: index }).then(res => {
        return res.data;
    });
};
const debug_1 = require("debug");
const path = require("path");
const pack = require("../package.json");
const d = debug_1.default(pack.name + ':' + path.basename(__filename));
exports.default = mongoose.model('Data', dataSchema);
//# sourceMappingURL=model.data.js.map