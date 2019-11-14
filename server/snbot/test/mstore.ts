import { expect } from 'chai';

import AutoBot, * as autobot from '../abot';
import MediaS3, * as ms3 from '../data/store.media'
import Auth, * as auth from '../data/model.auth'
const dotenv = require('dotenv')
dotenv.config();
let botConfig: any;
let s3Config: auth.AuthDoc;
let s3: MediaS3

describe(' #MediaStore ', function () {
    this.timeout(30000);
    before(async function () {
        await autobot.Database.connect(process.env.DATABASE_URI)
        s3Config = await Auth.findOne({usage:'s3', name:'cmsnart'})
        s3 = new MediaS3({auth: s3Config, region:'us-east-1', bucket:'test.cmsn'})
    })
    it('Store test', async function(){

        let res = await s3.storeSmall('https://pbs.twimg.com/profile_images/1134565042471366656/zpeRopM9_400x400.jpg')
        expect(res.key).exist
    })


})
