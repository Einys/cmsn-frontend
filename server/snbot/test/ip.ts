import { expect } from 'chai';

import AutoBot, * as autobot from '../abot';

import * as IParser from '../data/iparser';
import Auth, * as auth from '../data/model.auth'

const dotenv = require('dotenv')
dotenv.config();
let s3Config: auth.AuthDoc;
let botConfig: any;
let abot: AutoBot;

describe(' #ItemParser ', function () {
    this.timeout(30000);
    before(async function () {
        autobot.Database.connect(process.env.DATABASE_URI)
        s3Config = await Auth.findOne({usage:'s3'})
        botConfig = await autobot.Database.Bot.findOne({ code: "test" }) || {}
        console.log(JSON.stringify(botConfig, null, 2))
        abot = new AutoBot(botConfig)
    })
    it('Attachment Test', async function(){
        let tweet = await abot.getTweet('1129308702408765445')
        //let att = await IParser.parseAttachment(tweet, abot.getS3())
        //console.log(__filename, att);
    })
    it.only('Attachment Test', async function(){
        let text="편하게 연락주세요~자세한건 아래 링크로 들어가시면 됩니다▶http://t.co/DciCTYx9Da 환영합니다 https://t.co/t7UZjM0nQd"
        let regex=/https?:\/\/[\w\.\/]*/g
        regex.test(text);
        console.log( text.replace(regex, '://link') )
        //let att = await IParser.parseAttachment(tweet, abot.getS3())
        //console.log(__filename, att);
    })

})
