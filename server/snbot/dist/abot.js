"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bot_1 = require("./bot");
exports.Twit = bot_1.Twit;
const Database = require("./data/a.data.mongoose");
exports.Database = Database;
const a_data_mongoose_1 = require("./data/a.data.mongoose");
const iParser = require("./data/iparser");
const filter = require("./filter");
exports.filter = filter;
const datefns = require("date-fns");
const debug_1 = require("debug");
const path = require("path");
const pack = require("./package.json");
const d = debug_1.default(pack.name + ':' + path.basename(__filename));
/**
 * catchWebHookEvent
 * 또는 AutobotFactory({id:...}) 로 모듈 이용 시작할 것
 */
const INDEX_WORDLIST = 'words';
const INDEX_FILTER = 'filters';
const dmReply_1 = require("./dmReply");
class AutoBot extends bot_1.default {
    /**
     *
     * @param {*} param0
     * @param {DB} db
     */
    constructor(botConfig) {
        if (!botConfig.keys.consumer.key) {
            throw new Error('Bot consumer key is not exist, it may need to be populated.');
        }
        let keys = {
            consumer_key: botConfig.keys.consumer.key,
            consumer_secret: botConfig.keys.consumer.secret,
            access_token: botConfig.keys.access.token,
            access_token_secret: botConfig.keys.access.secret
        };
        super(botConfig.id, keys);
        this.botConfig = botConfig;
        try {
            this.s3 = new iParser.S3(botConfig.s3);
        }
        catch (error) {
            console.log(error);
            this.s3 = null;
        }
        //this.s3 = null;
        d(`Initialized Bot:${botConfig.name} ID:${botConfig.id}`);
    }
    /**
     * promoted 가 true여도 error 가 있을 수 있음. promoted가 false여도 retweetID가 있을 수 있음.
     * @param requestTweet tweet
     * @param renew force renew?
     */
    async promote(requestTweet, renew = false) {
        const bot = this.botConfig;
        //리밋 체크
        let statuesCount = await a_data_mongoose_1.Item.countDocuments({ "index.cat": bot.cat, "index.lang": bot.lang, departedAt: { "$gte": Date.now() - 1000 * 60 * 60 * 3 } });
        console.log('statuesCount : ', statuesCount);
        if (statuesCount > 140) {
            throw 'post status limit';
        }
        let result = { promoted: false };
        try {
            //트위터로부터 최상단 트윗 정보를 가져옴
            d('getting top tweet');
            let itemTweet = await this.getTopTweet(requestTweet, bot.threadOption);
            if (!itemTweet)
                return { promoted: false, filter: 'thread option unsatisfied' };
            //최상단 트윗을 가져오는 데 성공한 후 요청 세이브
            let req = await Database.Req.findOneAndUpdate({ id: requestTweet.id_str }, {
                userid: requestTweet.user.id_str,
                username: requestTweet.user.screen_name,
                text: requestTweet.text,
                itemid: itemTweet.id_str
            }, { upsert: true, new: true });
            //유저 정보 업데이트 파라미터
            d('setting user info update params');
            let conditions = { id: itemTweet.user.id_str }, update = { id: itemTweet.user.id_str, profileName: itemTweet.user.name, name: itemTweet.user.screen_name, sns: 'Twitter', lastVisit: Date.now() }, option = { upsert: true, new: true };
            //유저 정보 업설트!
            d('user info upserting');
            let user = await Database.User.findOneAndUpdate(conditions, update, option);
            let item = await Database.Item.findOne({ id: itemTweet.id_str });
            //필터링 시작
            d('start filtering');
            //db의 서버 전역 데이터 공간에서 filters 데이터를 가져온다 (그룹 필터링 데이터)
            const filters = await Database.Data.findbyIndex(INDEX_FILTER);
            if (!filters) {
                throw new Error('cannot find group filter data');
            }
            for (let group of bot.group) {
                let groupFilterlayers = filters[group];
                if (groupFilterlayers)
                    bot.filterLayers = bot.filterLayers.concat(groupFilterlayers);
            }
            //concat 결과 필터링 레이어 순서가, 봇 개별 filter, group0, group1, group2... 순으로 적용될 듯 하다
            d('filterLayers?');
            d(bot.filterLayers);
            let filter = await this.filter(bot.filterLayers, requestTweet, user, itemTweet, item);
            //필터를 통과했다면 filter.ok 가 true
            if (!filter.ok) {
                let admin = await Database.Bot.findOne({ code: 'admin' });
                let text = `https://twitter.com/${itemTweet.user.id_str}/status/${itemTweet.id_str}  내용 ${itemTweet.text} / 작성자 @${itemTweet.user.screen_name}, 사유: ${filter.index}`;
                d(text);
                this.sendDm(admin.id, { "text": text });
                result.promoted = false;
                result.filter = filter.index;
                return;
            }
            //언어 필터..
            if (!this.languageFilter(itemTweet, requestTweet)) {
                return;
            }
            //디폴트 필터..
            let defaultFilter = await this.defaultFilter(req, user, itemTweet, item);
            if (defaultFilter.ok) {
                d('passed filtering');
                let retweet = await this.retweetHard(itemTweet.id_str);
                if (retweet) {
                    d('retweeted ' + itemTweet.id);
                    result.retweetID = retweet.id_str;
                    if (bot.lang == 'ko')
                        this.sendReply(requestTweet, "리트윗 + 봇 연동 웹페이지에 홍보했어요! 행복한 커미션 되시길 바라요."); //이런 멘트 한국버전 영어버전 파일 쭉 만들어서 가져오기
                    else if (bot.lang == 'en')
                        this.sendReply(requestTweet, "Promoted! I wish your happy commission.");
                }
                item = await this.renewItemByTweet(itemTweet, renew);
                try {
                    //리트윗의 아이디 달기
                    item.retweetid = retweet.id_str;
                    //활성화
                    item.activated = true;
                    //갱신 현재시각
                    item.departedAt = Date.now();
                    //카테고리와 언어
                    if (item.index.cat) {
                        if (!(item.index.cat.indexOf(bot.cat) > -1)) {
                            item.index.cat.push(bot.cat);
                        }
                    }
                    else {
                        item.index.cat = [bot.cat];
                    }
                    if (item.index.lang) {
                        if (!(item.index.lang.indexOf(bot.lang) > -1)) {
                            item.index.lang.push(bot.lang);
                        }
                    }
                    else {
                        item.index.lang = [bot.lang];
                    }
                    //열었어요 찾습니다 분류
                    item.index.intent = [await parseIntent(itemTweet.text)];
                }
                catch (e) {
                    throw e;
                }
                finally {
                    const res = await item.save();
                    result.saved = res;
                    result.promoted = true;
                }
            }
            else {
                let admin = await Database.Bot.findOne({ code: 'admin' });
                let text = `https://twitter.com/${itemTweet.user.id_str}/status/${itemTweet.id_str}  내용 ${itemTweet.text} / 작성자 @${itemTweet.user.screen_name}, 사유: ${defaultFilter.index}`;
                d(text);
                this.sendDm(admin.id, { "text": text });
                result.promoted = false;
                result.filter = defaultFilter.index;
                if (defaultFilter.index === 'tooOften') {
                    let text = `너무 일찍 재홍보하시거나, 다른 분들에 비해 너무 많이 홍보하시는 것 같아요. 같이 홍보할 수 있는 내용은 한 트윗으로 모아주세요. 💌`;
                    this.sendReply(requestTweet, text);
                }
            }
            await Database.Req.findOne({ id: requestTweet.id_str }).then((req) => {
                if (item)
                    req._item = item._id;
                if (user)
                    req._user = user._id;
                if (req && !(req.target.some(element => { return element.botID === bot.id; }))) {
                    req.target.push({ botID: bot.id, retweetID: result.retweetID, filter: result.filter });
                }
                return req.save();
            });
        }
        catch (error) {
            d('Error: ' + error.stack);
            result.error = error;
        }
        finally {
            return result;
        }
    }
    async analyseUserUsage(user, itemTweet) {
        //전체 요청 성공 수랑 이 봇에 최근에 이 트윗을 홍보 성공한 기록..? 시간차..? 가져오기
        let recentSuccess = await Database.Req.findOne({ userid: user.id, itemid: itemTweet.id_str, 'target.botID': this.botConfig.id, 'target.retweetID': { $ne: null } }).sort({ updatedAt: -1 });
        let diffHours = undefined;
        if (recentSuccess) {
            diffHours = getDateDiffHours(recentSuccess.updatedAt, Date.now());
        }
        let recentCount = await Database.Req.countDocuments({ userid: user.id, 'target.botID': this.botConfig.id, 'target.retweetID': { $ne: null }, updatedAt: { "$gte": Date.now() - 1000 * 60 * 60 * 24 * 4 } });
        d(`유저 ${user.name} : 트윗 id ${itemTweet.id_str} 최근 홍보 요청 ${diffHours}시간 전, 최근 4일간 ${this.botConfig.id} 봇에 ${recentCount}회 홍보`);
        return { recentSuccess: recentSuccess, diffHours: diffHours, recentCount: recentCount };
        //{ "index.cat": bot.cat, "index.lang": bot.lang, departedAt: { "$gte": Date.now() - 1000 * 60 * 60 * 3 } }
    }
    async defaultFilter(req, user, itemTweet, item) {
        //필터 레이어 이후에 항상 적용되는 필터
        let analysedUser = await this.analyseUserUsage(user, itemTweet);
        //마지막 재홍보한지 72시간이 지나지 않음
        if (analysedUser.diffHours && analysedUser.diffHours < 72)
            return { ok: false, index: 'tooOften' };
        //최근 4일간 4회 이상 홍보
        if (analysedUser.recentCount && analysedUser.recentCount > 3)
            return { ok: false, index: 'tooOften' };
        //처음이 아니면 통과.
        if (user && user._items && user._items.length > 0) {
            d('INFO FILTER This user is not first time to be here... item length ', user._items.length);
            return { ok: true };
        }
        else {
            d('INFO FILTER new user here');
        }
        // 내용이 너무 짧고 아무것도 아님
        let text = itemTweet.text;
        if (text.length < 20 && await parseIntent(text) === 'und') {
            d('shorter then 20, not open nor find');
            return { ok: false, index: 'tooShort' };
        }
        if (req.text.includes("부탁드")) {
            d("Polite req PASS");
            return { ok: true, index: 'polite' };
        }
        if (req.text.includes("부탁합")) {
            d("Polite req PASS");
            return { ok: true, index: 'polite' };
        }
        if (req.text.includes("감사드")) {
            d("Polite req PASS");
            return { ok: true, index: 'polite' };
        }
        if (req.text.includes("감사합")) {
            d("Polite req PASS");
            return { ok: true, index: 'polite' };
        }
        if (req.text.includes("감사해")) {
            d("Polite req PASS");
            return { ok: true, index: 'polite' };
        }
        //프사가 디폴트고 유저네임이 길거나
        if (itemTweet.user.default_profile_image == true && itemTweet.user.screen_name.length > 13) {
            d('WARNING Default User accessed @' + user.name + " userId:" + user.id);
            return { ok: false, index: 'default' };
        }
        return { ok: true, index: 'end' };
    }
    /**
    *
    * @param {*} tweet
    * @param {*} req 답장을 보내야해서 파라미터로 추가. . . ..(2019.01.17)
    */
    languageFilter(tweet, req) {
        if (!(this.botConfig && this.botConfig.lang && tweet.lang)) {
            console.log(new Error('Error: bot config or tweet language info is not exist. pass language filter... '));
            return true;
        }
        console.log('LANGUSGEFILTER INFO / ', this.botConfig.lang, tweet.lang);
        if (this.botConfig.lang === 'ko' && tweet.lang && !(tweet.lang === 'ko' || tweet.lang === 'und')) {
            if (tweet.text.includes('커미션')) {
                console.log('language simple kor OK');
                return true;
            }
            this.sendReply(req, '커미션 홍보 언어가 한국어가 아닌 것으로 감지되었습니다.');
            return false;
        }
        if (this.botConfig.lang === 'en' && tweet.lang && !(tweet.lang === 'en' || tweet.lang === 'und')) {
            this.sendReply(req, 'Language of commission info detected is not English.');
            return false;
        }
        d('language OK :' + tweet.lang);
        return true;
    } //[languageFilter]
    async filter(filterLayers, requestTweet, user, itemTweet, item) {
        let filterData = {
            name: this.botConfig.name,
            cat: this.botConfig.cat,
            lang: this.botConfig.lang,
            word: await Database.Data.findbyIndex(INDEX_WORDLIST),
            blacklist: {
                find(query) {
                    return Database.Blacklist.findOne(query);
                }
            }
        };
        let f = new filter.Filter(filterLayers, filterData);
        return f.filterTweet(requestTweet, user, itemTweet, item);
    }
    async setThreadOptions(options) {
        let bot = await Database.Bot.findOne({ id: this.id });
        bot.threadOption = options;
        return bot.save();
    }
    async setfilterLayers(layers) {
        let bot = await Database.Bot.findOne('Bot', { id: this.id });
        bot.filterLayers = layers;
        return bot.save();
    }
    async getConfig() {
        let bot = await Database.Bot.findOne('Bot', { id: this.id });
        return bot;
    }
    dmResponse(dmReceived) {
    }
    async catchDeleteEvent(deleteEvent) {
        console.log('[director] deleteEvent : ', JSON.stringify(deleteEvent));
        //리트윗이 딜리트이벤트가 떴다는것 = 그 트윗이 지워졌다는뜻 혹은 리트윗해제됨 이므로 디비에서 비활성화함. 18.06.19 
        //이전 코드 가져옴 19.02.14
        let id = deleteEvent[0].status.id;
        a_data_mongoose_1.Item.findOneAndUpdate({ retweetid: id }, { activated: false }, function (err, res) {
            if (err) {
                console.log(err, '[director] deleteEvent error ');
            }
            else {
                if (res)
                    d('[director] Deactivated', res);
                else
                    d(`retweet id ${id} is not found in database`);
            }
        });
    }
    async catchTweetEvent(tweetEvent) {
        d('tweet event');
        if (tweetEvent[0].retweeted_status) {
            //리트윗이다.
            let retweet = tweetEvent[0];
            d('retweeted');
            //봇 자신이 리트윗한 이벤트가 아니고 다른 사람이 봇의 리트윗을 리트윗한 것일때 ( 리트윗한 유저ID != 봇 ID )
            if (retweet.user.id_str !== this.id) {
                d('tweetEvent: User', retweet.user.id_str, retweet.user.screen_name, ' retweeted tweet id ', retweet.retweeted_status.id_str);
                return;
            }
        }
        else {
            d('tweet create event');
            //리트윗이 아닌 멘션, 트윗작성 이벤트이다.
            //TODO: 인용트윗 처리를 않고 있음..
            //요청 트윗(req)을 풀텍스트로 가져온다.
            let requestTweet = await this.getTweet(tweetEvent[0].id_str);
            d('get request');
            //멘션된 유저에 봇이 포함되는지 확인
            let userMentioned = requestTweet.entities.user_mentions;
            function isTo(userID, user_mentions) {
                for (let i = 0; i < user_mentions.length; i++) {
                    if (user_mentions[i].id_str == userID)
                        return true;
                }
                return false;
            }
            d('mentioned? ' + userMentioned);
            if (isTo(this.id, userMentioned)) {
                //이 봇을 멘션한 이벤트이다.
                let itemTweet;
                if (requestTweet.text.includes("취소")) {
                    d('promote cancel');
                    //여러명이 섞인 타래라도 타래 맨 위의 트윗을 가져옴
                    itemTweet = await this.getTopTweet(requestTweet, { all: true });
                    //요청 트윗(tweet) 저장
                    let req = new Database.Req({
                        id: requestTweet.id_str,
                        userid: requestTweet.user.id_str,
                        username: requestTweet.user.screen_name,
                        text: requestTweet.text,
                        itemid: itemTweet.id_str
                    });
                    //취소요청인 경우 알티해제하고 req 성공 저장
                    this.unRetweet(itemTweet.id_str).then(() => {
                        req.result = { success: true };
                        return req.save();
                    }).catch(err => { console.log(err); req.save(); });
                }
                else {
                    d('promote');
                    //취소가 아닌 일반 멘션
                    //봇 설정에 따라 타래의 맨 위의 트윗을 가져오고 req, item, user 를 저장하는 함수 호출
                    let promoteResult = await this.promote(requestTweet);
                    return promoteResult;
                }
            }
            else {
                d('Not mentioning the Bot');
            }
        }
    }
    async catchDmEvent(dmEvent) {
        let bot = this;
        let dm = dmEvent[0].message_create;
        let sender_id = dm.sender_id;
        let DmRep = dmReply_1.reply;
        console.log("[director] dmevent sender id : " + sender_id);
        /**
         *
         * 아래의 코드 - 정지먹은 유저가 디엠으로 오면
         * 18.06.12
         *
         * 정지 표시를 유저에다가 다는것에서 따로 컬렉션을 만들어서 넣고 expire 시키는걸로
         * 18.08.31
         *
         */
        let reportedUser = await Database.Blacklist.findOne({ type: 'user', userid: sender_id });
        let senderUser = await Database.User.findOne({ id: sender_id });
        if (reportedUser) {
            console.log('WARNING suspended User DM approched', 'ID is', sender_id);
            let text = '@cms_env 로 문의주세요.';
            bot.sendDm(sender_id, { "text": text });
            return;
        }
        else {
            console.log(' [director] routeDM : not suspended user ');
        }
        let text = dm.message_data.text;
        let mdata_asklink = {
            "text": "어떤 트윗이 문제가 되었나요? 링크를 올려주세요."
        };
        if (dm.message_data.quick_reply_response) { //퀵리플라이 선택지를 통해 날아온 디엠임
            var metadata = dm.message_data.quick_reply_response.metadata;
            let mdata_end = {
                "text": "알려주셔서 감사합니다. 홍보에 일정 수의 신고가 모이면 홍보 해제, 또는 유저 이용 정지됩니다. 처음 선택지로 돌아가려면 '첫인사'라고 말씀해주세요. "
            };
            console.log("Metadata : " + metadata);
            /**
             *
             *
             * 아래부터 스위치
             * 신고이유(메타데이터)를 받아서
             * 그 이유를 말한 사람 아이디를 KEY로 신고내역 DB에서 신고를 찾아서
             * 신고에 이유를 업데이트한다
             *
             *
             */
            switch (metadata) {
                case 'pat':
                    bot.sendDm(sender_id, { "text": "´ω`) ♥ (좋아한다) " });
                    break;
                case 'external_id_1':
                    bot.sendDm(sender_id, mdata_asklink);
                    break;
                case 'external_id_2':
                    bot.sendDm(sender_id, DmRep.main_2_ququ);
                    break;
                case 'external_id_3':
                    bot.sendDm(sender_id, DmRep.main_3_coffee);
                    break;
                case 'external_id_4':
                    bot.sendDm(sender_id, DmRep.main_4_help);
                    break;
                case 'external_id_5':
                    bot.sendDm(sender_id, DmRep.main_5_suggest);
                    break;
                case "cancel":
                    bot.sendDm(sender_id, DmRep.welcome_message);
                    break;
                case "abuse_copyright":
                case "abuse_toomuch":
                case "abuse_rude":
                case "abuse_spam":
                case "abuse_porn":
                case "abuse_misuse":
                    //최근 대화기록 확인
                    await Database.Chat.find({ senderID: sender_id, targetID: this.id, 'content.reportedItemID': { $exists: true } }).sort({ 'updatedAt': -1 }).limit(1).then(chat => {
                        return this.createReportByTwitterItemID(metadata, chat[0].content.reportedItemID, sender_id);
                    }).then(reportDoc => {
                        Database.Report.find({ target_item: reportDoc.target_item, reason: { $exists: true } }).then(reports => {
                            console.log("-- REPORT LIST ");
                            console.log(reports);
                            if (senderUser && senderUser.admin) {
                                console.log("[dm] ADMIN REPORT ACTIVATE !");
                                //console.log("report.reason, reports : ", report.reason, ' @ ',reports);
                                this.activateReport(reports);
                            }
                            else if (reports.length > 7) { //신고가 n개 모여 정지. 항목별로 다르게 해야 되는데
                                this.activateReport(reports);
                                reports.forEach(e => {
                                    let text = "신고해주신 덕분에 트윗 (ID : " + e.target_item + ") 을 홍보 취소 처리하였으며, 유저 " + e.target_username + "의 이용이 일시 또는 영구적 정지 처리되고 있어요. 처리가 오류 없이 적절히 이루어졌나요?";
                                    bot.sendDm(e.sender_user, { "text": text });
                                });
                            } // 신고가 n 개 모임!
                        });
                    }).catch(err => {
                        console.log(err);
                    }); //find by Target tweet id
                    bot.sendDm(sender_id, mdata_end);
                    break;
                default:
                    console.log('unknown matadata arrived');
            }
        }
        else { // 선택지를 통하지 않고 직접 작성하거나 한 임의의 내용
            let botAccount = await Database.Bot.findOne({ id: sender_id });
            if (botAccount && !(botAccount.code === 'admin')) { //cmsn_bot && not admin
                console.log("[dm] TEST or BOT ACCOUNT ");
                return;
            }
            if (botAccount && botAccount.code === 'admin') {
                console.log("[dm] ADMIN ");
                //관리자 DM
                if (text.includes("현재")) {
                    if (senderUser.admin)
                        bot.sendDm(sender_id, "관리자 모드입니다.");
                    else
                        (!senderUser.admin);
                    bot.sendDm(sender_id, "일반 모드입니다.");
                }
                if (text.includes("관리자")) {
                    senderUser.admin = true;
                    senderUser.save();
                    bot.sendDm(sender_id, "관리자 상태로 전환되었습니다.");
                }
                if (text.includes("일반")) {
                    senderUser.admin = false;
                    senderUser.save();
                    bot.sendDm(sender_id, "일반 상태로 전환되었습니다.");
                }
            }
            /**
             * 첫인사를 받음
             */
            if (text.includes("첫인사")) {
                console.log("[dm] Req Welcome dm again Sender id : " + sender_id);
                bot.sendDm(sender_id, DmRep.welcome_message);
                return;
            }
            if (text.includes("쓰담쓰담")) {
                let imotion = ">ω<) ♥~~!";
                bot.sendDm(sender_id, { "text": imotion });
                return;
            }
            if (text.includes("쓰담")) {
                let imotion = "'ω') ♥♥♥";
                bot.sendDm(sender_id, { "text": imotion });
                return;
            }
            if (text.includes("쓰다듬")) {
                let imotion = "'ω') ♥♥♥";
                bot.sendDm(sender_id, { "text": imotion });
                return;
            }
            /**
             * 트윗에 링크가 있음
             * @dm.message_data.entities.urls
             */
            if (dm.message_data.entities.urls.length > 0) {
                try {
                    let url = dm.message_data.entities.urls[0].expanded_url;
                    let targetTweetID = parseLinkTotweetID(url);
                    let parsed = await this.analyzeReport(targetTweetID, sender_id);
                    d(parsed);
                    let itemTweet = parsed.targetItem;
                    if (!(itemTweet && itemTweet._user)) {
                        throw 'no item or _user';
                    }
                    if (parsed.blackItem) {
                        let text = '알려주신 ' + itemTweet._user.name + ' 의 트윗은 다수의 신고로 이용 중단 처리된 트윗입니다. 이 알림이 적절하였나요? 봇의 오류로 처리되지 않은 것 같다면 꼭 @cmsn_ADMIN에게 알려주세요. ';
                        bot.sendDm(sender_id, { "text": text });
                    }
                    else if (parsed.blackUser) {
                        let text = '알려주신 ' + itemTweet._user.name + ' 은 다수의 신고로 이용 중단 처리된 유저입니다. 이 알림이 적절하였나요? 봇의 오류로 처리되지 않은 것 같다면 꼭 @cmsn_ADMIN에게 알려주세요. ';
                        bot.sendDm(sender_id, { "text": text });
                    }
                    else if (parsed.existingReport) {
                        let text = "이미 신고하신 트윗입니다. 처음 선택지로 돌아가시려면 '첫인사' 라고 말씀해주세요. ";
                        bot.sendDm(sender_id, { "text": text });
                    }
                    else {
                        let content = {
                            reportedItemID: itemTweet.id
                        };
                        let newReportChat = new Database.Chat({ targetID: this.id, senderID: sender_id, content: content });
                        await newReportChat.save();
                        let text = itemTweet._user.name + ' 의 트윗 (ID: ' + itemTweet.id + ' ) 에 어떤 문제가 있나요?';
                        let report_choice = DmRep.report_choice;
                        report_choice.text = text;
                        bot.sendDm(sender_id, report_choice);
                    }
                }
                catch (e) {
                    console.error(e);
                    let text = "봇의 홍보 기록에서 링크된 내용을 찾지 못했습니다. 오류가 발생했습니다.";
                    bot.sendDm(sender_id, { "text": text });
                }
                return;
            } //여기까지 디엠으로 링크가 날아옴
            /**
             * 선택지대답이 아님
             */
            let imotion = "'ω') ";
            bot.sendDm(sender_id, { "text": imotion });
        }
    }
    /**
     * 신고된 트윗 id가 서비스에서 이미 제재된 트윗인지, sender가 이미 신고한 트윗인지 등을 체크하고 계속 진행할지 reportable 로 결정한다.
     * 서비스 이용 기록이 없는 트위터 유저도 디엠해서 링크를 신고할 수 있기 때문에 유저의 (트위터) id만 받는다.
     * @param id
     * @param sender_id
     */
    async analyzeReport(targetItemID, senderUserID) {
        let res = {};
        let reportedItem = await Database.Item.findOne({ id: targetItemID }).populate('_user');
        //트윗의 id가 홍보된 트윗의 id인지(db에 존재하는 item인지) 확인하고 아니라면 중단하고 리턴
        if (!reportedItem) {
            return res;
        }
        else {
            res.targetItem = reportedItem;
        }
        // 이미 제재된 트윗인지 확인
        let blackItemQuery = {
            itemid: reportedItem.id,
            type: 'item'
        };
        let blackItem = await Database.Blacklist.findOne(blackItemQuery);
        if (blackItem) {
            res.blackItem = blackItem;
            return res;
        }
        if (Database.item.userTypeGuard(reportedItem._user)) {
            let itemOwner = reportedItem._user;
            res.itemOwner = itemOwner;
            // 이미 제재된 유저인지 확인
            let blacklistUserQuery = {
                itemid: itemOwner.id,
                type: 'user'
            };
            let blackUser = await Database.Blacklist.findOne(blacklistUserQuery);
            if (blackUser) {
                res.blackItem = blackUser;
                return res;
            }
        }
        // 이미 신고한 트윗인지 확인
        let report = await Database.Report.findOne({
            target_item: targetItemID,
            sender_user: senderUserID,
            reason: { $exists: true }
        });
        if (report) {
            res.existingReport = report;
            return res;
        }
        // 위의 사항을 전부 통과했다면 신고 가능한 트윗
        res.reportable = true;
        return res;
    }
    async createReportByTwitterItemID(reason, targetItemid, senderUserID) {
        let reporteditem = await Database.Item.findOne({ id: targetItemid }).populate('_user');
        if (!Database.item.userTypeGuard(reporteditem._user)) {
            d('no user data');
            return;
        }
        d('reporting item id:' + targetItemid);
        //item id 를 이용해 초기화한다.
        let rep = new Database.Report();
        //신고이유, 신고자 정보를 추가
        rep.target_item = targetItemid;
        rep.reason = reason;
        rep.sender_user = senderUserID;
        rep.effected = false;
        rep.target_user = reporteditem._user.id;
        rep.target_username = reporteditem._user.name;
        //리포트 저장
        rep = await rep.save();
        //이미 존재하는 블랙리스트와 아이템id, 신고사유가 일치하면 
        //effected를 true로 만들고, 신고자에게 신고되었다는 DM을 주되
        //블랙리스트를 또 중복해서 추가하지는 않도록
        let alreadyBlacklisted = await Database.Blacklist.findOne({ itemid: rep.target_item, reason: rep.reason });
        if (alreadyBlacklisted) {
            this.replytoActivatedDMreport(rep);
            d('A report about already blacklisted item');
            rep.effected = true;
            rep = await rep.save();
        }
        else {
            await Database.Report.find({ target_itemid: rep.target_item, reason: { $exists: true } }).then(async (reports) => {
                //타겟id가 같고 이유가 설정 완료된 리포트
                d(`Can this report be effective? Report.length ${reports.length}`);
                let senderUser = await Database.User.findOne({ id: senderUserID });
                if ((senderUser && senderUser.admin) || reports.length > 3) {
                    d('- YES');
                    return this.activateReport(reports);
                }
                else {
                    d('- NO');
                }
            });
        }
        //잘 되었다면 리포트를 반환
        return rep;
    }
    /* 유저가 리포팅되면 : 유저의 activate중인 아이템 전부 임시 비활성화하도록 만들기(왜 임시냐면 유저가 제재가 풀렸을때 다시 살려야해서)
    async reportUser(reason:Data.report.userReason, user: Data.user.UserDoc, sender: {userid, username}){
        let r = new Data.Report()
        r.reason = reason
        r.target_userid = user.id
        r.target_username = user.name
        r.sender_userid = sender.userid
        r.sender_username = sender.username

        let rep = await r.save();
        
        let admin = await Data.Bot.findOne({name:'admin'})
        
        Data.Report.find({ target_userid: r.target_userid, reason: { $exists: true } }).then(reports => {  //find by user id
        
            d('Effected?')
            if (sender.userid === admin.id || reports.length > 4) {
                d('- YES')
                this.enactReport(reports)
            } else {
                d('- NO')
            }
        
        })
        return rep
    }
    */
    /**
     * 리포트(들)을 발효하여 블랙리스트를 추가한다.
     * @param report report
     */
    async activateReport(reports) {
        const EXPIRED_AFTER_14DAYS = 1000 * 60 * 60 * 24 * 14;
        const EXPIRED_AFTER_30DAYS = 1000 * 60 * 60 * 24 * 30;
        let report = reports[0];
        let blacklist = new Database.Blacklist();
        blacklist.username = report.target_username;
        //가장 많이 등록된 reason을 구한다
        let reasonarray = [];
        reports.forEach(e => {
            reasonarray.push(e.reason);
        });
        let effectiveReason = mode(reasonarray);
        //reason 저장
        blacklist.reason = effectiveReason;
        blacklist.userid = report.target_user;
        blacklist.itemid = report.target_item;
        blacklist.username = report.target_username;
        switch (effectiveReason) {
            case "abuse_toomuch":
                blacklist.expiredAt = new Date(Date.now() + EXPIRED_AFTER_14DAYS);
            case "abuse_copyright":
            case "abuse_rude":
            case "abuse_spam":
                blacklist.type = 'user';
                break;
            //여기까지 유저블락
            case "abuse_porn":
            case "abuse_misuse":
                blacklist.type = 'item';
                //여기까지 아이템블락
                break;
        }
        let bsave = await blacklist.save();
        d('Reports are effected');
        d(bsave);
        //유저가 신고 발동된거면 유저의 모든 아이템을 비활성화하자!
        if (bsave.userid) {
            await this.deactivateUser(bsave.userid);
        }
        else {
            //아니면 신고 대상 트윗 하나만 리트윗 해제!
            await this.unRetweet(report.target_item);
        }
        for (const e of reports) {
            if (!e.effected) {
                //신고 덕분에 제재 되었다고 DM하기
                this.replytoActivatedDMreport(e);
                e.effected = true;
                await e.save();
            }
        }
        return bsave;
    }
    /**
     * 유저의 모든 아이템을 리트윗 해제하고 비활성화
     * @param userid 유저 트위터 ID
     */
    async deactivateUser(userid) {
        let user = await Database.User.findOne({ id: userid }).populate('_items');
        for (let i of user._items) {
            function itemTypeguard(item) {
                return item && item.id;
            }
            if (itemTypeguard(i)) {
                this.unRetweet(i.id);
                i.activated = false;
                //TODO : 이렇다면 블락된 유저는 activate를 할 수 없도록 해야겠다...
                i.save();
            }
        }
    }
    /**
       * 트위터 url 링크 파싱해서 Dm 대답주던가 트윗url이 아니면 그냥 넘어감
       * @param {String} url // 트윗 url
       * @param {String} sender_id
    */
    replytoActivatedDMreport(e) {
        let text = "신고해주신 덕분에 트윗 (ID : " + e.target_item + ") 을 홍보 취소 처리하였으며, 유저 " + e.target_username + " 의 이용이 일시적 또는 영구적 정지 처리되고 있어요. 처리가 오류 없이 적절히 이루어졌나요?";
        this.sendDm(e.sender_user, { "text": text });
    }
    async renewItemByTweet(itemTweet, forceRenew = false) {
        let botS3 = this.s3;
        if (!botS3) {
            d('no s3');
            botS3 = null;
        }
        //아이템
        let item = await a_data_mongoose_1.Item.findOne({ id: itemTweet.id_str });
        let itemUpdate = {};
        if (item && !forceRenew) {
            //강제 리뉴얼이 아닐 경우 달라진 부분이나 부족한 부분만 채움
            d('Not renew');
            itemUpdate.updatedAt = Date.now();
            //item 트윗에 미디어가 첨부되어있지만 DB item의 attachment가 비었는가? : attachment 파싱 ,업데이트
            if (itemTweet.extended_entities && itemTweet.extended_entities.media[0] && (item.attachment.length < 1)) {
                item.attachment = await iParser.parseAttachment(itemTweet, botS3);
            }
            //Attachment S3 관련 저장. iParser의 custom option 도 체크한다.
            if (botS3 && typeof botS3.storeMediaByLink === 'function' && iParser.config.saveAttachMedia) {
                //attachment가 있지만 media가 비었는가? (DB에서 media만 따로 삭제된 경우) : S3에 저장하고 그 키를 DB에 저장
                if (Array.isArray(item.attachment) && item.attachment.length >= 1) {
                    for (let a of item.attachment) {
                        //media가 und 또는 null인가? 또는 media.origin이 비었는가?
                        if (!isMedia(a.media)) {
                            d(a.src + ' media is empty');
                            let media = await botS3.storeMediaByLink(a.src);
                            a.media = media;
                        }
                        else {
                            d('media data is exist');
                            // TODO : media 링크로 찾은 s3데이터가 삭제되었거나 해서 리뉴얼되어야 하는가?
                            if (isMedia(a.media) && a.media.s3) {
                                d('s3 exist');
                                let s3 = a.media.s3;
                                if (s3.small && !await isExistInAWSS3(s3.small.key, botS3)) {
                                    d('small not exist in s3');
                                    s3.small = await botS3.storeSmall(a.src);
                                }
                                if (s3.thumb && !await isExistInAWSS3(s3.thumb.key, botS3)) {
                                    d('thumb not exist in s3');
                                    s3.thumb = await botS3.storeThumb(a.src);
                                }
                            }
                        }
                    }
                }
            }
            //Link의 S3 관련 리뉴얼. 
            if (botS3 && typeof botS3.storeMediaByLink === 'function' && iParser.config.saveLinkMedia) {
                if (Array.isArray(item.links) && item.links.length >= 1) {
                    for (let link of item.links) {
                        //일단 무조건 메타데이터를 다시 파싱.
                        let newMeta = await iParser.parseLinkMeta(link.expanded_url);
                        const hasNoAttachment = item.attachment.length < 1;
                        //기존에 메타데이터가 없으면 새로 파싱한 메타데이터를 넣음.
                        if (!link.meta) {
                            link.meta = newMeta;
                        }
                        else {
                            //기존에 있다면 다른 부분을 갱신함
                            if (newMeta.title !== link.meta.title) {
                                link.meta.title = newMeta.title;
                            }
                            if (newMeta.image !== link.meta.image) {
                                link.meta.image = newMeta.image;
                                //메타 이미지가 달라졌으면 지우고 갱신...복잡하네...혹시 s3저장 안하기로 iparser에 설정되어있으면 그대로 저장 안할것임
                                botS3.deleteMedia(link.media).then(async () => {
                                    link.media = await iParser.storeMediaByMeta(newMeta, hasNoAttachment, botS3);
                                });
                            }
                            if (newMeta.description !== link.meta.description) {
                                link.meta.description = newMeta.description;
                            }
                            if (newMeta["twitter:card"] !== link.meta["twitter:card"]) {
                                link.meta["twitter:card"] = newMeta["twitter:card"];
                            }
                        }
                        if (!(link.media && link.media.s3) && botS3 && iParser.config.saveLinkMedia) {
                            //링크 미디어 s3 가 없는 경우 newMeta를 이용해서 미디어 생성
                            link.media = await iParser.storeMediaByMeta(newMeta, hasNoAttachment, botS3);
                        }
                        // TODO : media s3 키가 db에는 다 있는데 s3 자체에서 데이터가 삭제되었거나 해서 리뉴얼되어야 하는가?
                        if (isMedia(link.media) && link.media.s3 && botS3) {
                            d('s3 exist');
                            let s3 = link.media.s3;
                            if (s3.small && !await isExistInAWSS3(s3.small.key, botS3)) {
                                d('small not exist in s3');
                                s3.small = await botS3.storeSmall(link.meta.image);
                            }
                            if (s3.thumb && !await isExistInAWSS3(s3.thumb.key, botS3)) {
                                d('thumb not exist in s3');
                                s3.thumb = await botS3.storeThumb(link.meta.image);
                            }
                        }
                    }
                }
            }
        }
        else if (item && forceRenew) {
            d('Renew');
            // 기존에 아이템이 있었지만 강제로 새로고침을 할 예정이다.
            // 기존 데이터를 청소해야 한다.
            // S3가 있다면 청소한다.
            if (botS3 && typeof botS3.deleteMedia === 'function') {
                if (item.attachment) {
                    for (const a of item.attachment) {
                        botS3.deleteMedia(a.media);
                    }
                }
                if (item.links) {
                    for (const l of item.links) {
                        botS3.deleteMedia(l.media);
                    }
                }
            }
            // s3 데이터 삭제 완료
            item = await iParser.parseItemByTweet(itemTweet, botS3);
            d('parsed');
            d(item);
        }
        else {
            d('new');
            //기존 데이터가 없는 경우
            item = await iParser.parseItemByTweet(itemTweet, botS3);
            d(item);
        }
        d('item parsing finished');
        d(JSON.stringify(item));
        //유저
        let user = await a_data_mongoose_1.User.findOne({ id: itemTweet.user.id_str });
        if (!user) {
            user = new a_data_mongoose_1.User();
        }
        user.id = itemTweet.user.id_str;
        user.profileName = itemTweet.user.name;
        user.profileImg = itemTweet.user.profile_image_url_https;
        user.profile_img = itemTweet.user.profile_image_url_https; //depreciated
        user.name = itemTweet.user.screen_name;
        user.lastVisit = Date.now();
        if (user._items.indexOf(item._id) > -1) {
            d('User already has this item');
        }
        else {
            user._items.push(item._id);
        }
        d('update user');
        user.updateOne(user, function (err, raw) {
            if (err)
                d(err);
            else
                d(raw);
        });
        d(JSON.stringify(user));
        item._user = user._id;
        d('update item');
        item.updateOne(item, function (err, raw) {
            if (err)
                d(err);
            else
                d(raw);
        });
        return item;
    }
    /**
     * 아이템과 아이템에 연결된 데이터(user._items, media s3 key)를 삭제한다.
     * @param tweetID itemDoc.id 또는 tweet id
     */
    async removeItemByTweetID(tweetID) {
        return a_data_mongoose_1.Item.findOneAndRemove({ id: tweetID }).then(async (removedItem) => {
            const user = await a_data_mongoose_1.User.findById(removedItem._user);
            let index = user._items.indexOf(removedItem._id);
            if (index > -1) {
                user._items.splice(index, 1);
            }
            for (let a of removedItem.attachment) {
                if (a.media)
                    this.s3.deleteMedia(a.media);
            }
            for (let l of removedItem.links) {
                if (l.media)
                    this.s3.deleteMedia(l.media);
            }
            return user.save().then(() => { return removedItem._id; });
        });
    }
}
exports.default = AutoBot;
async function updateUserbyItemTweet(itemTweet) {
    //유저
    let user = await a_data_mongoose_1.User.findOne({ id: itemTweet.user.id_str });
    if (!user) {
        user = new a_data_mongoose_1.User();
    }
    user.id = itemTweet.user.id_str;
    user.profileName = itemTweet.user.name;
    user.profileImg = itemTweet.user.profile_image_url_https;
    user.profile_img = itemTweet.user.profile_image_url_https; //depreciated
    user.name = itemTweet.user.screen_name;
    user.lastVisit = Date.now();
    user.updateOne(user);
    return user;
}
exports.updateUserbyItemTweet = updateUserbyItemTweet;
async function AutoBotFactory(params) {
    let conf = await Database.Bot.findOne(params);
    if (!conf) {
        throw new Error('Cannot find bot config matching ' + JSON.stringify(params));
    }
    else {
        return new AutoBot(conf);
    }
}
exports.AutoBotFactory = AutoBotFactory;
async function catchWebHookEvent(twitterEvent) {
    let event = twitterEvent;
    let receiverID = event.for_user_id;
    if (!receiverID) {
        throw new Error('for_user_id is not exist in event');
    }
    let tweetEvent = event.tweet_create_events;
    let dmEvent = event.direct_message_events;
    let dmIndEvent = event.direct_message_indicate_typing_events;
    let blockEvent = event.block_events;
    let deleteEvent = event.tweet_delete_events;
    let followEvent = event.follow_events;
    let bot = await AutoBotFactory({ id: receiverID });
    if (tweetEvent) {
        return bot.catchTweetEvent(tweetEvent);
    }
    else if (dmEvent) {
        return bot.catchDmEvent(dmEvent);
    }
    else if (event.direct_message_indicate_typing_events) {
        d('dm indicate event');
    }
    else if (event.block_events) {
        d('block event');
        if (blockEvent[0].type === 'block') {
            let blacklist = new Database.Blacklist();
            blacklist.type = 'user';
            blacklist.userid = blockEvent[0].target.id;
            blacklist.username = blockEvent[0].target.screen_name;
            blacklist.reason = "block_by_admin";
            blacklist.save((err, res) => {
                if (err)
                    console.error(err);
                else
                    d('Saved blacklist : ', res.userid);
            });
        }
    }
    else if (deleteEvent) {
        return bot.catchDeleteEvent(deleteEvent);
    }
    else if (event.follow_events) {
        d('follow event');
    }
    else {
        d('Unknown event');
    }
}
exports.catchWebHookEvent = catchWebHookEvent;
function connectDatabase(uri) {
    return Database.connect(uri);
}
exports.connectDatabase = connectDatabase;
function closeDatabaseconn() {
    return Database.disconnect();
}
exports.closeDatabaseconn = closeDatabaseconn;
/**
 * parse an intent(find, open, und)
 * @param text
 */
async function parseIntent(text) {
    function i(origin, params, count = 1) {
        for (const p of params) {
            if (origin.includes(p)) {
                count -= 1;
            }
            if (count <= 0) {
                return true;
            }
        }
        return false;
    }
    let wordlist = await Database.Data.findbyIndex(INDEX_WORDLIST);
    if (!wordlist) {
        throw new Error('cannot find word data');
    }
    if (i(text, wordlist.FIND) || i(text, wordlist.DRAWABLE)) {
        return 'find';
    }
    else if (i(text, wordlist.OPEN) || i(text, wordlist.DRAW) || i(text, wordlist.MONEY)) {
        return 'open';
    }
    else if (i(text, wordlist.MONEY_COUNTING, 3)) {
        return 'open';
    }
    else {
        return 'und';
    }
    /*
    if (mytext.isOneOf(wordlist.FIND) || mytext.isOneOf(wordlist.DRAWABLE)) {
        return 'FIND'
    } else if (mytext.isOneOf(wordlist.OPEN) || mytext.isOneOf(wordlist.DRAW) || mytext.isOneOf(wordlist.MONEY))
        return 'OPEN'
    else if (mytext.countAll(wordlist.MONEY_COUNTING) >= 3) {
        console.log('categoryFilter: occurrencesofArr >=3 wordlist.MONEY_COUNT')
        return 'OPEN'
    }
    else
        return 'UNKNOWN'
    return null
    */
}
exports.parseIntent = parseIntent;
//필요한게 필터.....계정리스트?....스레드옵션.....디엠대화설정. 이건 프로그램 돌려놔도 변경할 수 있어야됨. 그때그때 읽어오는 식인가그럼.
//그때그때 읽어오는식으로 db랑 연동을 어케시키지.........
/**
 * 두 날짜 간 차이를 절댓값으로 반환하는 함수
 */
function getDateDiffHours(date1, date2) {
    const diffHours = Math.abs(datefns.differenceInHours(date1, date2));
    d(diffHours);
    return diffHours;
}
exports.getDateDiffHours = getDateDiffHours;
async function getUserReqSucceedCount(user, bot) {
    const query = { userid: user.id };
    const count = await Database.Req.find(query);
}
exports.getUserReqSucceedCount = getUserReqSucceedCount;
/**
 * 배열에서 가장 많이 나타난 요소를 리턴한다.
 * @param {array} array
 */
function mode(array) {
    if (array.length == 0)
        return null;
    var modeMap = {};
    var maxEl = array[0], maxCount = 1;
    for (var i = 0; i < array.length; i++) {
        var el = array[i];
        if (modeMap[el] == null)
            modeMap[el] = 1;
        else
            modeMap[el]++;
        if (modeMap[el] > maxCount) {
            maxEl = el;
            maxCount = modeMap[el];
        }
    }
    return maxEl;
}
function parseLinkTotweetID(str) {
    // ex. 'https://twitter.com/Asta_1021/status/1003913735423967233신고합니다12번위반하네요' 에서 '1003913735423967233'를 추출함
    var spl = str.split(/\/|\s/); //정규식은 슬래시 사이에 어떤 식을 넣는다. '*'은 여러번반복 '.'은 한번등장
    var index = str.split(/\/|\s|\?/).indexOf('status') + 1; // 'status' 바로 다음에 등장하는 것이 id에 해당하는 부분이므로 그걸 선택하기 위해
    var re = /\d*/; //숫자만 추출하는 정규식
    console.log('plink2ID :' + re.exec(spl[index]));
    return re.exec(spl[index])[0];
}
function isMedia(media) {
    return media && (media.origin !== undefined);
}
//S3에 존재하는 데이터의 key인가 체크하는 함수 (S3데이터만 따로 삭제된 경우를 false로 체크) 존재하면 true 아니면 false
async function isExistInAWSS3(mediakey, botS3) {
    let awsS3 = botS3.s3;
    var params = {
        Bucket: botS3.bucket,
        Key: mediakey
    };
    // Using async/await (untested)
    try {
        const headCode = await awsS3.headObject(params).promise();
        const signedUrl = await awsS3.getSignedUrl('getObject', params);
        // Do something with signedUrl
    }
    catch (headErr) {
        d('S3 head: ' + headErr);
        if (headErr.code === 'NotFound') {
            return false;
        }
        else {
            return true;
        }
    }
}
exports.isExistInAWSS3 = isExistInAWSS3;
//# sourceMappingURL=abot.js.map