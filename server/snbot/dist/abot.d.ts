/// <reference types="twit" />
import Tbot, { Bot, Twit } from './bot';
import * as Database from './data/a.data.mongoose';
import * as iParser from './data/iparser';
export { Database as Database, Twit };
import * as filter from './filter';
export { filter };
export default class AutoBot extends Tbot {
    botConfig: Bot.Ibot;
    s3: iParser.S3;
    /**
     *
     * @param {*} param0
     * @param {DB} db
     */
    constructor(botConfig: Bot.Ibot);
    /**
     * promoted 가 true여도 error 가 있을 수 있음. promoted가 false여도 retweetID가 있을 수 있음.
     * @param requestTweet tweet
     * @param renew force renew?
     */
    promote(requestTweet: any, renew?: boolean): Promise<{
        promoted: boolean;
        error?: any;
        retweetID?: any;
        filter?: any;
        saved?: Database.item.Iitem;
    }>;
    analyseUserUsage(user: Database.user.User, itemTweet: any): Promise<{
        recentSuccess: Database.req.reqDoc;
        diffHours: any;
        recentCount: number;
    }>;
    defaultFilter(req: Database.req.IReq, user: Database.user.User, itemTweet: any, item: Database.item.Iitem): Promise<{
        ok: boolean;
        index?: 'tooOften' | 'polite' | 'tooShort' | 'default' | 'end';
    }>;
    /**
    *
    * @param {*} tweet
    * @param {*} req 답장을 보내야해서 파라미터로 추가. . . ..(2019.01.17)
    */
    languageFilter(tweet: any, req: any): boolean;
    filter(filterLayers: Array<any>, requestTweet: Twit.Twitter.Status, user: Database.user.UserDoc, itemTweet: Twit.Twitter.Status, item: Database.item.ItemDoc): Promise<{
        ok: boolean;
        index: string;
        res: any;
    } | {
        ok: boolean;
        index: string;
        res?: undefined;
    }>;
    setThreadOptions(options: any): Promise<Bot.botDoc>;
    setfilterLayers(layers: Array<any>): Promise<Bot.botDoc>;
    getConfig(): Promise<Bot.botDoc>;
    dmResponse(dmReceived: any): void;
    catchDeleteEvent(deleteEvent: any): Promise<void>;
    catchTweetEvent(tweetEvent: any): Promise<{
        promoted: boolean;
        error?: any;
        retweetID?: any;
        filter?: any;
        saved?: Database.item.Iitem;
    }>;
    catchDmEvent(dmEvent: any[]): Promise<void>;
    /**
     * 신고된 트윗 id가 서비스에서 이미 제재된 트윗인지, sender가 이미 신고한 트윗인지 등을 체크하고 계속 진행할지 reportable 로 결정한다.
     * 서비스 이용 기록이 없는 트위터 유저도 디엠해서 링크를 신고할 수 있기 때문에 유저의 (트위터) id만 받는다.
     * @param id
     * @param sender_id
     */
    analyzeReport(targetItemID: string, senderUserID: string): Promise<{
        targetItem?: Database.item.ItemDoc;
        itemOwner?: Database.user.UserDoc;
        blackItem?: Database.blacklist.blacklistDoc;
        blackUser?: Database.blacklist.blacklistDoc;
        existingReport?: Database.report.reportDoc;
        reportable?: boolean;
    }>;
    createReportByTwitterItemID(reason: Database.report.reason, targetItemid: string, senderUserID: string): Promise<Database.report.reportDoc>;
    /**
     * 리포트(들)을 발효하여 블랙리스트를 추가한다.
     * @param report report
     */
    activateReport(reports: Database.report.reportDoc[]): Promise<Database.blacklist.blacklistDoc>;
    /**
     * 유저의 모든 아이템을 리트윗 해제하고 비활성화
     * @param userid 유저 트위터 ID
     */
    deactivateUser(userid: any): Promise<void>;
    /**
       * 트위터 url 링크 파싱해서 Dm 대답주던가 트윗url이 아니면 그냥 넘어감
       * @param {String} url // 트윗 url
       * @param {String} sender_id
    */
    replytoActivatedDMreport(e: Database.report.reportDoc): void;
    renewItemByTweet(itemTweet: any, forceRenew?: boolean): Promise<Database.item.ItemDoc>;
    /**
     * 아이템과 아이템에 연결된 데이터(user._items, media s3 key)를 삭제한다.
     * @param tweetID itemDoc.id 또는 tweet id
     */
    removeItemByTweetID(tweetID: string): Promise<any>;
}
export declare function updateUserbyItemTweet(itemTweet: any): Promise<Database.user.UserDoc>;
export declare function AutoBotFactory(params: Database.bot.Ibot): Promise<AutoBot>;
export declare function catchWebHookEvent(twitterEvent: any): Promise<void | {
    promoted: boolean;
    error?: any;
    retweetID?: any;
    filter?: any;
    saved?: Database.item.Iitem;
}>;
export declare function connectDatabase(uri: string): Promise<void>;
export declare function closeDatabaseconn(): Promise<void>;
/**
 * parse an intent(find, open, und)
 * @param text
 */
export declare function parseIntent(text: string): Promise<"find" | "open" | "und">;
/**
 * 두 날짜 간 차이를 절댓값으로 반환하는 함수
 */
export declare function getDateDiffHours(date1: any, date2: any): number;
export declare function getUserReqSucceedCount(user: any, bot: any): Promise<void>;
export declare function isExistInAWSS3(mediakey: string, botS3: iParser.S3): Promise<boolean>;
