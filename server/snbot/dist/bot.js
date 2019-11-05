"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Twit = require("twit");
exports.Twit = Twit;
const Bot = require("./data/model.bot");
exports.Bot = Bot;
const debug_1 = require("debug");
const path = require("path");
const pack = require("./package.json");
const d = debug_1.default(pack.name + ':' + path.basename(__filename));
class Tbot {
    constructor(id, keys) {
        this.keys = keys;
        this.Twitter = new Twit(keys);
        this.id = id || null;
        if (process.env.TWITTER_NOPOST && id !== '858242295807696896') { // exclude test bot id
            d('[bot.js] TWITTER_NOPOST');
            //@ts-ignore
            this.Twitter.post = function (path, params, callback) {
                d('[bot.js TWITTER_NOPOST] twitter post', path, JSON.stringify(params, null, 2));
                //@ts-ignore
                callback(null, {}, {});
            };
            //@ts-ignore
            this.Twitter.delete = function (a, b, c) {
                d('[bot.js TWITTER_NOPOST] twitter delete', a, JSON.stringify(b));
                c(null, {}, {});
            };
        }
    }
    getbotID() {
        return this.id;
    }
    retweet(tweetID) {
        let Twitter = this.Twitter;
        let retweet = () => {
            return new Promise(function (resolve, reject) {
                d('[bot.js/retweet] ', tweetID);
                Twitter.post('statuses/retweet/:id', { id: tweetID }, function (error, twt, response) {
                    if (error) {
                        d('[bot.js/retweet] Failed retweeting', tweetID);
                        reject(error);
                    }
                    else {
                        resolve(twt);
                    }
                });
            });
        };
        return retry(retweet, 3);
    }
    retweetHard(tweetID) {
        return this.unRetweet(tweetID).then(() => {
            return this.retweet(tweetID);
        }).catch(err => {
            return this.retweet(tweetID);
        });
    }
    unRetweet(tweetID) {
        let Twitter = this.Twitter;
        let unretweet = () => {
            return new Promise(function (resolve, reject) {
                d('[bot.js/unRetweet] ', tweetID);
                Twitter.post('statuses/unretweet/:id', { id: tweetID }, function (error, twt, response) {
                    if (error) {
                        d('[bot.js/unRetweet] Failed un-retweeting ', tweetID);
                        reject(error);
                    }
                    else {
                        resolve(twt);
                    }
                });
            });
        };
        return retry(unretweet, 3);
    }
    sayStatus(json) {
        let Twitter = this.Twitter;
        return new Promise(function (resolve, reject) {
            if (typeof json !== 'object') {
                throw new TypeError('[bot.js/sayStatus] post param must be object, got ' + typeof json);
            }
            else {
                Twitter.post('statuses/update', json, function (error, tweet, response) {
                    if (error) {
                        reject(error);
                    }
                    else {
                        d('[bot.js/sayStatus] Posted ', json.status);
                        resolve(tweet);
                    }
                });
            }
            ;
        });
    }
    /**
 *
 * @param {Object} replyTarget a tweet object to reply in
 * @param {String} text word to say
 */
    sendReply(replyTarget, text) {
        if (process.env.BETA_TEST) {
            console.info('[bot.js] sendReply', replyTarget.user.screen_name, ' message:', text);
            return;
        }
        if (replyTarget.id_str) {
            var send = '@' + replyTarget.user.screen_name + ' ' + text;
        }
        else {
            return new Error('[bot.js] Cannot send reply tweet : replyTarget tweet id is empty');
        }
        return this.sayStatus({ status: send, in_reply_to_status_id: replyTarget.id_str });
    }
    sendDm(targetID, message_data) {
        let Twitter = this.Twitter;
        if (process.env.BETA_TEST) {
            console.info('[bot.js/sendDM] (BETA_TEST) Bot Would Send DM to ', targetID, ' message:', message_data);
            return;
        }
        if (!targetID) {
            console.info('[bot.js/sendDM] target id is empty ');
            return;
        }
        let param = {
            "event": {
                "type": "message_create",
                "message_create": {
                    "target": {
                        "recipient_id": targetID
                    },
                    "message_data": message_data
                }
            }
        };
        //@ts-ignore
        Twitter.post('direct_messages/events/new', param, function (err, res) {
            if (err)
                d(err);
        });
    }
    getTweet(tweetID) {
        let Twitter = this.Twitter;
        d('[getTweet] GET ID:', tweetID);
        let get = () => {
            return new Promise(function (resolve, reject) {
                Twitter.get('statuses/show/:id', { id: tweetID, tweet_mode: 'extended' }, function (error, tweet, response) {
                    if (error) {
                        reject(error);
                    }
                    else {
                        tweet.text = tweet.full_text ? tweet.full_text : tweet.text;
                        resolve(tweet);
                    }
                });
            });
        };
        return retry(get, 3);
    }
    /**
     * 어떤 트윗에 연결된 타래의 가장 위의 트윗을 가져온다.
     */
    getTopTweet(target, threadOption = { all: false, passableIds: [] }) {
        let self = this;
        let Twitter = this.Twitter;
        let curTweet = target;
        if (curTweet.in_reply_to_status_id_str == null) {
            //d('This is origin Tweet: ' + curTweet.text);
            d('[getTopTweet] origin tweet from: ', curTweet.user.screen_name);
            //d('OT :: ', curTweet.text);
            return new Promise((resolve, reject) => resolve(curTweet));
        }
        else {
            return self.getTweet(curTweet.in_reply_to_status_id_str).then((tweet) => {
                const passable = Array.isArray(threadOption.passableIds) && (threadOption.passableIds.includes(tweet.user.id_str) || threadOption.passableIds.includes(curTweet.user.id_str));
                if (threadOption.all) {
                    //무조건 패스인 스레드
                    return self.getTopTweet(tweet, threadOption);
                }
                else if ((tweet.user.id_str === curTweet.user.id_str) || passable) {
                    //조건 : 위아래 같거나, 위 또는 아래의 아이디 중 하나가 패스가능한 아이디(passable)이거나.
                    return self.getTopTweet(tweet, threadOption);
                }
                else {
                    //스레드 옵션을 만족시키지 못하는 스레드
                    d('[bot.ts] ThreadOption is not satisfied : ', curTweet.id_str);
                    return;
                }
            });
        }
    }
    /*
    
    DM 웰컴메세지 설정하는 데 필요한 함수들
    
    setDmWelcome
    setDmWelcomeRule 룰을 걸어줘야 하는데 룰이 되게 그냥 아이디 등록 정도밖에 안돼???
    deleteDmWelcomeRule 룰은 한 앱에 한개밖에 존재못해서... 지우고 새로등록 해야됨...
    
    */
    setDmWelcome(payload) {
        let Twitter = this.Twitter;
        return new Promise(function (resolve, reject) {
            //@ts-ignore
            Twitter.post('direct_messages/welcome_messages/new', payload, function (err, res) {
                if (err)
                    reject(err);
                else
                    resolve(res);
            });
        }).then((res) => {
            return this.setDmWelcomeRule(res.welcome_message.id);
        });
    }
    updateDmWelcome(id, payload) {
        let Twitter = this.Twitter;
        return new Promise(function (resolve, reject) {
            //@ts-ignore
            Twitter.put('direct_messages/welcome_messages/update.json?id=' + id, payload, function (err, res) {
                if (err)
                    reject(err);
                else
                    return this.setDmWelcomeRule(res.welcome_message.id);
            });
        });
    }
    setDmWelcomeRule(welcome_message_id) {
        let param = {
            "welcome_message_rule": {
                "welcome_message_id": welcome_message_id
            }
        };
        let Twitter = this.Twitter;
        return new Promise(function (resolve, reject) {
            //@ts-ignore
            Twitter.post('direct_messages/welcome_messages/rules/new', param, function (err, res) {
                if (err)
                    reject(err);
                else
                    resolve(res);
            });
        });
    }
    deleteDmWelcome(welcome_message_id) {
        let param = {
            "id": welcome_message_id
        };
        let Twitter = this.Twitter;
        return new Promise(function (resolve, reject) {
            //@ts-ignore
            Twitter.delete('direct_messages/welcome_messages/destroy', param, function (err, res) {
                if (err)
                    reject(err);
                else
                    resolve('Deleted');
            });
        });
    }
    deleteDmWelcomeRule(welcome_message_rule_id) {
        let param = {
            "id": welcome_message_rule_id
        };
        let Twitter = this.Twitter;
        return new Promise(function (resolve, reject) {
            //@ts-ignore
            Twitter.delete('direct_messages/welcome_messages/rules/destroy', param, function (err, res) {
                if (err)
                    reject(err);
                else
                    resolve('Deleted');
            });
        });
    }
    getWelcomeMessage() {
        let Twitter = this.Twitter;
        console.log(Twitter);
        return new Promise(function (resolve, reject) {
            Twitter.get('direct_messages/welcome_messages/list', function (err, res) {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                console.log('[bot.js] WMLIST ' + JSON.stringify(res.welcome_messages));
                if (res.welcome_messages) {
                    let length = res.welcome_messages.length;
                    if (length > 0) {
                        resolve(res.welcome_messages[length - 1]);
                    }
                    else {
                        reject({ statusCode: 404, message: 'No Welcome message found!' });
                    }
                }
                else {
                    reject({ statusCode: 404, message: 'No Welcome message found!' });
                }
            });
        });
    }
    getWelcomeMessageRule() {
        let Twitter = this.Twitter;
        return new Promise(function (resolve, reject) {
            Twitter.get('direct_messages/welcome_messages/rules/list', function (err, res) {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                console.log('[bot.js] WM RULE LIST ' + JSON.stringify(res.welcome_message_rules));
                if (Array.isArray(res.welcome_message_rules)) {
                    resolve(res.welcome_message_rules);
                }
                else {
                    reject({ statusCode: 404, message: 'No Welcome message rule found!' });
                }
            });
        });
    }
}
exports.default = Tbot;
/**
 * Retries the given function until it succeeds given a number of retries and an interval between them. They are set
 * by default to retry 5 times with 1sec in between. There's also a flag to make the cooldown time exponential
 * @author Daniel Iñigo <danielinigobanos@gmail.com> https://gitlab.com/snippets/1775781
 * @param {Function} fn - Returns a promise
 * @param {Number} retriesLeft - Number of retries. If -1 will keep retrying
 * @param {Number} interval - Millis between retries. If exponential set to true will be doubled each retry
 * @param {Boolean} exponential - Flag for exponential back-off mode
 * @return {Promise<*>}
 */
async function retry(fn, retriesLeft = 5, interval = 1000, exponential = false) {
    try {
        const val = await fn();
        return val;
    }
    catch (error) {
        if (retriesLeft) {
            await new Promise(r => setTimeout(r, interval));
            d(`retrying in ${interval}...`);
            return retry(fn, retriesLeft - 1, exponential ? interval * 2 : interval, exponential);
        }
        else
            throw new Error(error + ' Max retries reached');
    }
}
//# sourceMappingURL=bot.js.map