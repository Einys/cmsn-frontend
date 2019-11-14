"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const autobot = require("../abot");
const store_media_1 = require("../data/store.media");
const model_auth_1 = require("../data/model.auth");
const dotenv = require('dotenv');
dotenv.config();
let botConfig;
let s3Config;
let s3;
describe(' #MediaStore ', function () {
    this.timeout(30000);
    before(async function () {
        await autobot.Database.connect(process.env.DATABASE_URI);
        s3Config = await model_auth_1.default.findOne({ usage: 's3', name: 'cmsnart' });
        s3 = new store_media_1.default({ auth: s3Config, region: 'us-east-1', bucket: 'test.cmsn' });
    });
    it('Store test', async function () {
        let res = await s3.storeSmall('https://pbs.twimg.com/profile_images/1134565042471366656/zpeRopM9_400x400.jpg');
        chai_1.expect(res.key).exist;
    });
});
//# sourceMappingURL=mstore.js.map