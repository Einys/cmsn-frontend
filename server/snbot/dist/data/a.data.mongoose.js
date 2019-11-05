"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Mongoose = require("mongoose");
exports.Mongoose = Mongoose;
const model_item_1 = require("./model.item"), item = model_item_1;
exports.Item = model_item_1.default;
exports.item = item;
const model_user_1 = require("./model.user"), user = model_user_1;
exports.User = model_user_1.default;
exports.user = user;
const model_req_1 = require("./model.req"), req = model_req_1;
exports.Req = model_req_1.default;
exports.req = req;
const model_bot_1 = require("./model.bot"), bot = model_bot_1;
exports.Bot = model_bot_1.default;
exports.bot = bot;
const model_blacklist_1 = require("./model.blacklist"), blacklist = model_blacklist_1;
exports.Blacklist = model_blacklist_1.default;
exports.blacklist = blacklist;
const model_report_1 = require("./model.report"), report = model_report_1;
exports.Report = model_report_1.default;
exports.report = report;
const model_auth_1 = require("./model.auth"), auth = model_auth_1;
exports.Auth = model_auth_1.default;
exports.auth = auth;
const model_data_1 = require("./model.data"), data = model_data_1;
exports.Data = model_data_1.default;
exports.data = data;
const model_chat_1 = require("./model.chat"), chat = model_chat_1;
exports.Chat = model_chat_1.default;
exports.chat = chat;
const debug_1 = require("debug");
const path = require("path");
const pack = require("../package.json");
const d = debug_1.default(pack.name + ':' + path.basename(__filename));
function connect(uri) {
    if (Mongoose.connection.readyState) {
        console.log('MongoDB already connected');
        return;
    }
    Mongoose.set('useFindAndModify', false); //이거안하면 update에서 $set오류나고 depreciated 경고도 남
    return Mongoose.connect(uri, { useNewUrlParser: true }).then((mongoose) => {
        console.log('MongoDB connected');
        if (process.env.NODE_ENV !== 'production')
            console.log(uri);
    });
}
exports.connect = connect;
function disconnect() {
    d('Mongodb disconnected');
    return Mongoose.connection.close();
}
exports.disconnect = disconnect;
//# sourceMappingURL=a.data.mongoose.js.map