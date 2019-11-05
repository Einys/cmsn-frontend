import * as Twit from 'twit';
import * as Bot from './data/model.bot';
export { Bot, Twit };
export default class Tbot {
    keys: Twit.Options;
    id: string;
    Twitter: Twit;
    postStatusLimit: boolean;
    constructor(id: string, keys: Twit.Options);
    getbotID(): string;
    retweet(tweetID: string): Promise<any>;
    retweetHard(tweetID: string): Promise<any>;
    unRetweet(tweetID: string): Promise<any>;
    sayStatus(json: any): Promise<{}>;
    /**
 *
 * @param {Object} replyTarget a tweet object to reply in
 * @param {String} text word to say
 */
    sendReply(replyTarget: any, text: any): Error | Promise<{}>;
    sendDm(targetID: any, message_data: any): void;
    getTweet(tweetID: string): Promise<Twit.Twitter.Status>;
    /**
     * 어떤 트윗에 연결된 타래의 가장 위의 트윗을 가져온다.
     */
    getTopTweet(target: Twit.Twitter.Status, threadOption?: Bot.threadOption): Promise<Twit.Twitter.Status>;
    setDmWelcome(payload: {
        welcome_message: {
            name: string;
            message_data: {
                text: string;
                attachment?: {
                    type: "media";
                    media: {
                        "id": string;
                    };
                };
            };
        };
    }): Promise<{}>;
    updateDmWelcome(id: any, payload: {
        welcome_message: {
            name: string;
            message_data: {
                text: string;
                attachment?: {
                    type: "media";
                    media: {
                        "id": string;
                    };
                };
            };
        };
    }): Promise<{}>;
    setDmWelcomeRule(welcome_message_id: any): Promise<{}>;
    deleteDmWelcome(welcome_message_id: any): Promise<{}>;
    deleteDmWelcomeRule(welcome_message_rule_id: any): Promise<{}>;
    getWelcomeMessage(): Promise<{}>;
    getWelcomeMessageRule(): Promise<{}>;
}
