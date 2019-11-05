"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Router } = require('express');
const router = Router();
//system function module
const snbot = require("../abot");
//database
const model_item_1 = require("./model.item");
const debug_1 = require("debug");
const path = require("path");
const pack = require("../package.json");
const d = debug_1.default(pack.name + ':' + path.basename(__filename));
//18.12.30 임시 엔드포인트. 나중에 트윗으로 등록이 아닌 직접 데이터 입력해서 등록할 때 쓰나...?
router.post('/create', function (req, res, next) {
    if (!req.isAuthenticated()) {
        res.send(401, 'Not authorized');
    }
    else {
        console.log(`[item.controller] User ${req.user} sent data ${req.body}`);
    }
});
router.post('/create/:id', async function (req, res, next) {
    if (!req.isAuthenticated()) {
        res.send(401, 'Not authorized');
    }
    else {
        d(`User ${req.user.name} sent tweet id ${req.params.id}`);
        let bot = await snbot.AutoBotFactory({ _id: "5cc708e7f5dd95465c145b63" }); //test
        model_item_1.default.findOne({ id: req.params.id }).then(item => {
            //이미 존재하는 item인지 판단. 존재하면 reject.
            if (item) {
                d("Create-requested tweet already exists (409)");
                return Promise.reject({ statusCode: 409, message: 'Conflict Data' });
            }
            else {
                return bot.getTweet(req.params.id);
            }
        })
            .then(tweet => {
            //유저가 요청한 트윗이 자신의 것이거나 유저가 admin인지 판단. 아니면 reject해서 then chain을 끊음.
            if (tweet.user.id_str === req.user.id || req.user.admin) {
                tweet.lang = req.body.lang;
                return bot.renewItemByTweet(tweet);
            }
            else {
                d("User sent a tweet not their own (403)");
                return Promise.reject({ statusCode: 403, message: 'Permission Required (Not own tweet)' });
            }
        })
            .then(saved => {
            return res.json(saved);
        }).catch(err => {
            console.error(err);
            return res.status(err.statusCode || 500).send(err.message || 'server error');
        });
    }
});
router.put('/update', function (req, res, next) {
    console.log('[item.controller] update:', req.body);
    let payload = {
        index: {
            cat: req.body.cat,
            type: req.body.type,
            lang: req.body.lang
        }
    };
    model_item_1.default.findOneAndUpdate({ id: req.body.id }, payload).then(saved => {
        return res.json(saved);
    }).catch(err => {
        console.error(err);
        return res.status(err.statusCode || 500).send(err.message || 'server error');
    });
});
router.post('/promote', function (req, res, next) {
    console.log('[item.controller] promote:', req.body.id);
    model_item_1.default.findOneAndUpdate({ id: req.body.id }, { departedAt: Date.now(), activated: true }).then(saved => {
        return res.json(saved);
    }).catch(err => {
        console.error(err);
        return res.status(err.statusCode || 500).send(err.message || 'server error');
    });
    /**
     * 트위터 RT봇 에게 RT하도록 할것...
     */
});
router.post('/retweet', function (req, res, next) {
    console.log('[item.controller.js] ', req.body.id);
    return res.json({ id: req.body.id });
});
router.post('/like', function (req, res, next) {
    console.log('[item.controller.js] ', req.body.id);
    return res.status(200).send('OK');
});
//just response a real tweet
router.get('/twitter/show/:id', async function (req, res, next) {
    const id = req.params.id; //by twitter id
    let bot = await snbot.AutoBotFactory({ _id: "5cc708e7f5dd95465c145b63" }); //test
    bot.getTweet(id).then(tweet => {
        res.json(tweet);
    }).catch(err => {
        console.error('item controller ', err);
        res.status(err.statusCode || 500).send(err.message);
    });
});
router.get('/all', function (req, res, next) {
    let count = req.query.count ? parseInt(req.query.count) : 30;
    return model_item_1.default.find({ activated: true }).sort({ 'departedAt': -1 }).limit(count).populate('_user').then((entities) => {
        res.json(entities);
    }).catch(err => { console.log(err); res.status(500).send(err.message); });
});
router.get('/list', function (req, res, next) {
    let condition = {};
    let cat = req.query.cat;
    let intent = req.query.intent;
    let count = parseInt(req.query.count) || 5;
    let skip = req.query.skip ? parseInt(req.query.skip) : 0;
    skip = skip > 0 ? skip : 0; // 0보다 적은 값 스킵할 수 없도록
    condition['$and'] = [];
    //cat
    if (cat) {
        condition['$and'].push({ '$or': [{ 'index.category': cat.toUpperCase() }, { 'index.cat': cat }] });
    }
    //intent
    if (intent) {
        condition['$and'].push({ '$or': [{ 'index.intent': req.query.intent }] });
    }
    //lang
    condition['$and'].push({ '$or': [{ 'index.lang': 'ko' }, { 'index.language': 'KOR' }] });
    //OR조건쿼리 쓰고싶으면 query.$or = [{조건1}, {조건2}]
    //텍스트 검색
    if (req.query.keyword) {
        const key = req.query.keyword;
        if (typeof key === 'string' && key.length < 8) {
            let regex = new RegExp('\w*' + key + '\w*', 'i');
            condition.text = { $regex: regex };
        }
        else {
            condition.$text = { $search: req.query.keyword };
        }
    }
    if (req.query.before) {
        condition.departedAt = { '$lt': req.query.before };
        //console.log(query, 'query')
    }
    return model_item_1.default.list(condition, count, skip).then((entities) => {
        //d(`entities starts with : ${entities.list[0]}`)
        //d(`entities next : ${entities.next[0]}`)
        res.send(entities);
    }).catch(err => { console.log(err); res.status(400).send(err.message); });
});
router.get('/:cat/:intent', function (req, res, next) {
    //deprecated
    let query = {};
    let cat = req.params.cat;
    let count = parseInt(req.query.count) || 5;
    query['$and'] = [];
    query['$and'].push({ '$or': [{ 'index.category': cat.toUpperCase() }, { 'index.cat': cat }] });
    query['$and'].push({ '$or': [{ 'index.intent': req.params.intent }] });
    query['$and'].push({ '$or': [{ 'index.lang': 'ko' }, { 'index.language': 'KOR' }] });
    //OR조건쿼리 쓰고싶으면 query.$or = [{조건1}, {조건2}]
    if (req.query.cursorDate) {
        query.departedAt = { '$lt': req.query.cursorDate };
        //console.log(query, 'query')
    }
    let skip = req.query.skip ? parseInt(req.query.skip) : 0;
    skip = skip > 0 ? skip : 0; // 0보다 적은 값 스킵할 수 없도록
    d('query');
    return model_item_1.default.list(query, count, skip).then((entities) => {
        d(`entities starts with : ${entities.list[0]}`);
        d(`entities next : ${entities.next[0]}`);
        res.send(entities);
    }).catch(err => { console.log(err); res.status(400).send(err.message); });
});
router.get('/:id', function (req, res, next) {
    const id = req.params.id; //by twitter id
    model_item_1.default.findOne({ id: id }).populate('_user').then(item => {
        if (item)
            res.json(item);
        else
            res.status(404).send('컨텐츠를 찾을 수 없습니다');
    }).catch(err => {
        console.error(err);
        res.status(500).send(err.message);
    });
});
exports.default = router;
//# sourceMappingURL=controller.item.js.map