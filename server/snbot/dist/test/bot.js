"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const df = require("date-fns");
const bot_1 = require("../bot");
const Data = require("../data/a.data.mongoose");
describe(' #Bot ', function () {
    this.timeout(30000);
    let keys;
    let bot;
    before(async function () {
        Data.connect(process.env.DATABASE_URI);
        let botDoc = await Data.Bot.findOne({ code: 'test' });
        keys = botDoc.keys;
        bot = new bot_1.default('1111', { consumer_key: keys.consumer.key, consumer_secret: keys.consumer.secret, access_token: keys.access.token, access_token_secret: keys.access.secret });
    });
    it('봇 클래스 클로징이 잘 되어있는지', function () {
        let bot2 = new bot_1.default('1234', { consumer_key: keys.consumer.key, consumer_secret: keys.consumer.secret, access_token: keys.access.token, access_token_secret: keys.access.secret });
        chai_1.expect(bot.getbotID()).to.equal('1111');
        chai_1.expect(bot2.getbotID()).to.equal('1234');
    });
    it('트윗 하나 읽어오기', async function () {
        let res = await bot.getTweet('996782998178713600');
        console.log('1#', res);
        chai_1.expect(res).to.exist;
    });
    it('트윗 하나 리트윗하기', async function () {
        let res = await bot.retweetHard('983271653055475712');
        console.log('2#', res);
        chai_1.expect(res).to.exist;
    });
    it('순수한 타래 가장 위의 트윗 가져오기', async function () {
        let tweet = await bot.getTweet('983756992727564289');
        let res = await bot.getTopTweet(tweet);
        console.log(res);
        chai_1.expect(res.text).to.equal('Hello!!');
    });
    it('섞인 타래 가장 위의 트윗 가져오기', async function () {
        let tweet = await bot.getTweet('1094627560472727552');
        let res = await bot.getTopTweet(tweet, { all: true });
        console.log(res);
        chai_1.expect(res.text).to.equal('Success');
    });
    it('섞인 타래 걸러내기', async function () {
        let tweet = await bot.getTweet('1094627560472727552');
        let res = await bot.getTopTweet(tweet);
        console.log(res);
        chai_1.expect(res).to.equal(null);
    });
    it('섞인 타래에서 특정 id는 포함해도 괜찮게 하기', async function () {
        let tweet = await bot.getTweet('1094627560472727552');
        let res = await bot.getTopTweet(tweet, { all: false, passableIds: ['858242295807696896'] });
        console.log(res);
        chai_1.expect(res.text).to.exist;
    });
    it('답멘 하기', async function () {
        let replyTarget = await bot.getTweet('1094627332193570816').catch(err => { console.log(err); });
        let now = new Date();
        let res = await bot.sendReply(replyTarget, `현재시각 ${df.format(now, 'YY-MM-DD h:m:ss')}`);
        chai_1.expect(res).to.exist;
    });
});
//# sourceMappingURL=bot.js.map