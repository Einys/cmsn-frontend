import { expect } from 'chai';
import AutoBot, * as snbot from '../abot'
import { filter, Database } from '../abot';
import * as dmReply from '../dmReply';

const dotenv = require('dotenv')
dotenv.config({path:__dirname+'/../../../.env'});
let botConfig: any;
let abot: AutoBot;

describe(' #AutoBot ', async function () {
    this.timeout(100000)
    before(async () => {
        console.log('connecting...')
        snbot.Database.connect(process.env.DATABASE_URI)

        abot = await snbot.AutoBotFactory({code: 'test'})
    })
    it('트윗 하나 가져오기', async function () {
        let res = await abot.getTweet('1133078391085625344');
        expect(res.text).to.exist;
    })
    it('요청을 읽어서 홍보하기', async function () {
        let res = await abot.getTweet('1179567272278417408');
        let retweet = await abot.promote(res, true);
        expect(retweet.promoted).to.equal(true);
        expect(retweet.error).not.exist;
        console.log(retweet.error)
    })
    it('필터링하기', async function(){
        let filter = snbot.filter

        let layers : Array<filter.filterLayer> = []

        let content3 = [new filter.Operand(['itweet', 'text'], 'target'), new filter.Operand( ['word', 'BADWORD'], 'filter'), filter.operator('incl')  ]
        let eq3 = new filter.Equation(content3)
        let layer3 : filter.filterLayer = {be:'ex', condition:eq3, index:'badword' }
        layers.push(layer3)

        let req = await abot.getTweet('1133084927304511490');
        let user : Database.user.UserDoc
        let itemTweet = await abot.getTopTweet(req)
        let item : Database.item.ItemDoc;

        let o = await abot.filter(layers, req, user, itemTweet, item)
        expect(o.ok).equal(false)
    })
    it('필터링되는 홍보', async function(){
        let req = await abot.getTweet('1133084927304511490');
        let retweet = await abot.promote(req, true);
        expect(retweet.promoted).to.equal(false);
    })
    it('신고하기', async function(){
        let reqBody = {"for_user_id":"858242295807696896","direct_message_events":[{"type":"message_create","id":"1179623320821489668","created_timestamp":"1570079090682","message_create":{"target":{"recipient_id":"858242295807696896"},"sender_id":"921069199228919809","message_data":{"text":"잦은 요청","entities":{"hashtags":[],"symbols":[],"user_mentions":[],"urls":[]},"quick_reply_response":{"type":"options","metadata":"abuse_toomuch"}}}}],"users":{"921069199228919809":{"id":"921069199228919809","created_timestamp":"1508434984551","name":"MY Grape","screen_name":"MyGrape11","protected":false,"verified":false,"followers_count":0,"friends_count":4,"statuses_count":46,"profile_image_url":"http://pbs.twimg.com/profile_images/983269476744376320/MmM4dY0U_normal.jpg","profile_image_url_https":"https://pbs.twimg.com/profile_images/983269476744376320/MmM4dY0U_normal.jpg"},"858242295807696896":{"id":"858242295807696896","created_timestamp":"1493455883505","name":"고양이손바닥","screen_name":"andCatPaw","description":"예쁜것모아요","protected":false,"verified":false,"followers_count":2,"friends_count":20,"statuses_count":1136,"profile_image_url":"http://pbs.twimg.com/profile_images/983270449336348672/aknSmdlR_normal.jpg","profile_image_url_https":"https://pbs.twimg.com/profile_images/983270449336348672/aknSmdlR_normal.jpg"}}}
        await abot.catchDmEvent(reqBody.direct_message_events);
        let rep : Database.report.IReport = {
            target_item: "1179567212274733057",
            sender_user: "921069199228919809"
        };
        let report = await snbot.Database.Report.findOne(rep)
        expect(report).exist;

        await abot.catchDmEvent(reqBody.direct_message_events);
        let report2 = await snbot.Database.Report.find(rep)
        expect(report2.length).is.equal(1);
    })
    it('신고 분석하기', async function(){
        let reqBody = {"for_user_id":"858242295807696896","direct_message_events":[{"type":"message_create","id":"1179623320821489668","created_timestamp":"1570079090682","message_create":{"target":{"recipient_id":"858242295807696896"},"sender_id":"921069199228919809","message_data":{"text":"잦은 요청","entities":{"hashtags":[],"symbols":[],"user_mentions":[],"urls":[]},"quick_reply_response":{"type":"options","metadata":"abuse_toomuch"}}}}],"users":{"921069199228919809":{"id":"921069199228919809","created_timestamp":"1508434984551","name":"MY Grape","screen_name":"MyGrape11","protected":false,"verified":false,"followers_count":0,"friends_count":4,"statuses_count":46,"profile_image_url":"http://pbs.twimg.com/profile_images/983269476744376320/MmM4dY0U_normal.jpg","profile_image_url_https":"https://pbs.twimg.com/profile_images/983269476744376320/MmM4dY0U_normal.jpg"},"858242295807696896":{"id":"858242295807696896","created_timestamp":"1493455883505","name":"고양이손바닥","screen_name":"andCatPaw","description":"예쁜것모아요","protected":false,"verified":false,"followers_count":2,"friends_count":20,"statuses_count":1136,"profile_image_url":"http://pbs.twimg.com/profile_images/983270449336348672/aknSmdlR_normal.jpg","profile_image_url_https":"https://pbs.twimg.com/profile_images/983270449336348672/aknSmdlR_normal.jpg"}}}
        let res = await abot.analyzeReport("1179567212274733057", "921069199228919809");
        console.log(res);
        expect(res.existingReport).exist;
    })
    it('중복 신고', async function(){
        let reqBody = {"for_user_id":"858242295807696896","direct_message_events":[{"type":"message_create","id":"1179781369284612100","created_timestamp":"1570116772372","message_create":{"target":{"recipient_id":"858242295807696896"},"sender_id":"921069199228919809","message_data":{"text":"https://t.co/vnTq9ngUDS","entities":{"hashtags":[],"symbols":[],"user_mentions":[],"urls":[{"url":"https://t.co/vnTq9ngUDS","expanded_url":"https://twitter.com/MyGrape11/status/1179567212274733057","display_url":"twitter.com/MyGrape11/stat…","indices":[0,23]}]}}}}],"users":{"921069199228919809":{"id":"921069199228919809","created_timestamp":"1508434984551","name":"MY Grape","screen_name":"MyGrape11","protected":false,"verified":false,"followers_count":0,"friends_count":4,"statuses_count":46,"profile_image_url":"http://pbs.twimg.com/profile_images/983269476744376320/MmM4dY0U_normal.jpg","profile_image_url_https":"https://pbs.twimg.com/profile_images/983269476744376320/MmM4dY0U_normal.jpg"},"858242295807696896":{"id":"858242295807696896","created_timestamp":"1493455883505","name":"고양이손바닥","screen_name":"andCatPaw","description":"예쁜것모아요","protected":false,"verified":false,"followers_count":2,"friends_count":20,"statuses_count":1135,"profile_image_url":"http://pbs.twimg.com/profile_images/983270449336348672/aknSmdlR_normal.jpg","profile_image_url_https":"https://pbs.twimg.com/profile_images/983270449336348672/aknSmdlR_normal.jpg"}}}
        await abot.catchDmEvent(reqBody.direct_message_events);
        await abot.catchDmEvent(reqBody.direct_message_events);
        let rep : Database.report.IReport = {
            target_item: "1179567212274733057",
            sender_user: "921069199228919809"
        };
        let report2 = await snbot.Database.Report.find(rep)
        expect(report2.length).is.equal(1);
    })
    it('manage promote request', async function(){
        let reqBody = {"for_user_id":"1014719446525476864","tweet_create_events":[{"created_at":"Thu Oct 03 16:10:37 +0000 2019","id":1179790868309368800,"id_str":"1179790868309368834","text":"여유로워서... 연성교환... 구해봅니다..\n\n저는 디자인이고\n\n교환은 수공예 그림 글 작곡 등 장르 가리지 않습니다~!\n\n차액 입금 가능해요 플텍풀고 멘션주세요!\n\n@cmsn_d @cmsn_M… https://t.co/VgOE0PA6Fb","source":"<a href=\"http://twitter.com/download/android\" rel=\"nofollow\">Twitter for Android</a>","truncated":true,"in_reply_to_status_id":null,"in_reply_to_status_id_str":null,"in_reply_to_user_id":null,"in_reply_to_user_id_str":null,"in_reply_to_screen_name":null,"user":{"id":1158276305785221000,"id_str":"1158276305785221121","name":"[커미션] 유 디자인","screen_name":"kim_jakup","location":"배포 링크","url":"https://t.co/Bi0SPNmINA","description":"디자인 합니다 | 자료 백업도 겸하는 계정 |\n리퀘박스 : https://t.co/1EMT4TafpJ?amp=1","translator_type":"none","protected":false,"verified":false,"followers_count":20,"friends_count":1,"listed_count":3,"favourites_count":8,"statuses_count":108,"created_at":"Mon Aug 05 07:19:25 +0000 2019","utc_offset":null,"time_zone":null,"geo_enabled":false,"lang":null,"contributors_enabled":false,"is_translator":false,"profile_background_color":"F5F8FA","profile_background_image_url":"","profile_background_image_url_https":"","profile_background_tile":false,"profile_link_color":"1DA1F2","profile_sidebar_border_color":"C0DEED","profile_sidebar_fill_color":"DDEEF6","profile_text_color":"333333","profile_use_background_image":true,"profile_image_url":"http://pbs.twimg.com/profile_images/1165546992279310337/cuZoHAD3_normal.jpg","profile_image_url_https":"https://pbs.twimg.com/profile_images/1165546992279310337/cuZoHAD3_normal.jpg","profile_banner_url":"https://pbs.twimg.com/profile_banners/1158276305785221121/1569502997","default_profile":true,"default_profile_image":false,"following":null,"follow_request_sent":null,"notifications":null},"geo":null,
        "coordinates":null,"place":null,"contributors":null,"quoted_status_id":1177845435857133600,"quoted_status_id_str":"1177845435857133568","quoted_status":{"created_at":"Sat Sep 28 07:20:09 +0000 2019","id":1177845435857133600,"id_str":"1177845435857133568","text":"🎈\n\n❣️목표액 달성 시 RT추첨 기프티콘❣️\n\n무슬롯제 디자인 커미션을 받습니다.\n\n커뮤 홍보지/인장/세션카드/썰갈피/배경화면/헤더/로고 외 예시에 없어도 작업 가능하니 문의 부탁드려요.\n\n샘플 및 금액… https://t.co/Oi9Mqw9ndh","display_text_range":[0,140],"source":"<a href=\"http://twitter.com/download/android\" rel=\"nofollow\">Twitter for Android</a>","truncated":true,"in_reply_to_status_id":null,"in_reply_to_status_id_str":null,"in_reply_to_user_id":null,"in_reply_to_user_id_str":null,"in_reply_to_screen_name":null,"user":{"id":1158276305785221000,"id_str":"1158276305785221121","name":"[커미션] 유 디자인","screen_name":"kim_jakup","location":"배포 링크","url":"https://t.co/Bi0SPNmINA","description":"디자인 합니다 | 자료 백업도 겸하는 계정 |\n리퀘박스 : https://t.co/1EMT4TafpJ?amp=1","translator_type":"none","protected":false,"verified":false,"followers_count":20,"friends_count":1,"listed_count":3,"favourites_count":8,"statuses_count":107,"created_at":"Mon Aug 05 07:19:25 +0000 2019","utc_offset":null,"time_zone":null,"geo_enabled":false,"lang":null,"contributors_enabled":false,"is_translator":false,"profile_background_color":"F5F8FA","profile_background_image_url":"","profile_background_image_url_https":"","profile_background_tile":false,"profile_link_color":"1DA1F2","profile_sidebar_border_color":"C0DEED","profile_sidebar_fill_color":"DDEEF6","profile_text_color":"333333","profile_use_background_image":true,"profile_image_url":"http://pbs.twimg.com/profile_images/1165546992279310337/cuZoHAD3_normal.jpg","profile_image_url_https":"https://pbs.twimg.com/profile_images/1165546992279310337/cuZoHAD3_normal.jpg","profile_banner_url":"https://pbs.twimg.com/profile_banners/1158276305785221121/1569502997",
        "default_profile":true,"default_profile_image":false,"following":null,"follow_request_sent":null,"notifications":null},"geo":null,"coordinates":null,"place":null,"contributors":null,"is_quote_status":false,"extended_tweet":{"full_text":"🎈\n\n❣️목표액 달성 시 RT추첨 기프티콘❣️\n\n무슬롯제 디자인 커미션을 받습니다.\n\n커뮤 홍보지/인장/세션카드/썰갈피/배경화면/헤더/로고 외 예시에 없어도 작업 가능하니 문의 부탁드려요.\n\n샘플 및 금액 안내 포스타입\n💕 https://t.co/8dLVwK2RUm \n\n타래에 배포용 작업/자료가 있습니다. https://t.co/OnCXC3qcvG","display_text_range":[0,171],"entities":{"hashtags":[],"urls":[{"url":"https://t.co/8dLVwK2RUm","expanded_url":"http://posty.pe/8l3x54","display_url":"posty.pe/8l3x54","indices":[125,148]}],"user_mentions":[],"symbols":[],"media":[{"id":1177845406895460400,"id_str":"1177845406895460352","indices":[172,195],"media_url":"http://pbs.twimg.com/media/EFiMKDZUUAAfYpw.jpg","media_url_https":"https://pbs.twimg.com/media/EFiMKDZUUAAfYpw.jpg","url":"https://t.co/OnCXC3qcvG","display_url":"pic.twitter.com/OnCXC3qcvG","expanded_url":"https://twitter.com/kim_jakup/status/1177845435857133568/photo/1","type":"photo","sizes":{"medium":{"w":1000,"h":568,"resize":"fit"},"thumb":{"w":150,"h":150,"resize":"crop"},"large":{"w":1000,"h":568,"resize":"fit"},"small":{"w":680,"h":386,"resize":"fit"}}},{"id":1177845415539949600,"id_str":"1177845415539949568","indices":[172,195],"media_url":"http://pbs.twimg.com/media/EFiMKjmUwAAHF-L.jpg","media_url_https":"https://pbs.twimg.com/media/EFiMKjmUwAAHF-L.jpg","url":"https://t.co/OnCXC3qcvG","display_url":"pic.twitter.com/OnCXC3qcvG","expanded_url":"https://twitter.com/kim_jakup/status/1177845435857133568/photo/1","type":"photo","sizes":{"medium":{"w":1000,"h":568,"resize":"fit"},"thumb":{"w":150,"h":150,"resize":"crop"},"large":{"w":1000,"h":568,"resize":"fit"},"small":{"w":680,"h":386,"resize":"fit"}}},{"id":1177845423840514000,"id_str":"1177845423840514048","indices":[172,195],"media_url":"http://pbs.twimg.com/media/EFiMLChVUAAjWkS.jpg",
        "media_url_https":"https://pbs.twimg.com/media/EFiMLChVUAAjWkS.jpg","url":"https://t.co/OnCXC3qcvG","display_url":"pic.twitter.com/OnCXC3qcvG","expanded_url":"https://twitter.com/kim_jakup/status/1177845435857133568/photo/1","type":"photo","sizes":{"thumb":{"w":150,"h":150,"resize":"crop"},"medium":{"w":1000,"h":568,"resize":"fit"},"large":{"w":1000,"h":568,"resize":"fit"},"small":{"w":680,"h":386,"resize":"fit"}}},{"id":1177845433621569500,"id_str":"1177845433621569543","indices":[172,195],"media_url":"http://pbs.twimg.com/media/EFiMLm9UYAcYrq-.jpg","media_url_https":"https://pbs.twimg.com/media/EFiMLm9UYAcYrq-.jpg","url":"https://t.co/OnCXC3qcvG","display_url":"pic.twitter.com/OnCXC3qcvG","expanded_url":"https://twitter.com/kim_jakup/status/1177845435857133568/photo/1","type":"photo","sizes":{"thumb":{"w":150,"h":150,"resize":"crop"},"small":{"w":680,"h":386,"resize":"fit"},"large":{"w":1000,"h":568,"resize":"fit"},"medium":{"w":1000,"h":568,"resize":"fit"}}}]},"extended_entities":{"media":[{"id":1177845406895460400,"id_str":"1177845406895460352","indices":[172,195],"media_url":"http://pbs.twimg.com/media/EFiMKDZUUAAfYpw.jpg","media_url_https":"https://pbs.twimg.com/media/EFiMKDZUUAAfYpw.jpg","url":"https://t.co/OnCXC3qcvG","display_url":"pic.twitter.com/OnCXC3qcvG","expanded_url":"https://twitter.com/kim_jakup/status/1177845435857133568/photo/1","type":"photo","sizes":{"medium":{"w":1000,"h":568,"resize":"fit"},"thumb":{"w":150,"h":150,"resize":"crop"},"large":{"w":1000,"h":568,"resize":"fit"},"small":{"w":680,"h":386,"resize":"fit"}}},{"id":1177845415539949600,"id_str":"1177845415539949568","indices":[172,195],"media_url":"http://pbs.twimg.com/media/EFiMKjmUwAAHF-L.jpg","media_url_https":"https://pbs.twimg.com/media/EFiMKjmUwAAHF-L.jpg","url":"https://t.co/OnCXC3qcvG","display_url":"pic.twitter.com/OnCXC3qcvG","expanded_url":"https://twitter.com/kim_jakup/status/1177845435857133568/photo/1","type":"photo","sizes":{"medium":{"w":1000,"h":568,"resize":"fit"},
        "thumb":{"w":150,"h":150,"resize":"crop"},"large":{"w":1000,"h":568,"resize":"fit"},"small":{"w":680,"h":386,"resize":"fit"}}},{"id":1177845423840514000,"id_str":"1177845423840514048","indices":[172,195],"media_url":"http://pbs.twimg.com/media/EFiMLChVUAAjWkS.jpg","media_url_https":"https://pbs.twimg.com/media/EFiMLChVUAAjWkS.jpg","url":"https://t.co/OnCXC3qcvG","display_url":"pic.twitter.com/OnCXC3qcvG","expanded_url":"https://twitter.com/kim_jakup/status/1177845435857133568/photo/1","type":"photo","sizes":{"thumb":{"w":150,"h":150,"resize":"crop"},"medium":{"w":1000,"h":568,"resize":"fit"},"large":{"w":1000,"h":568,"resize":"fit"},"small":{"w":680,"h":386,"resize":"fit"}}},{"id":1177845433621569500,"id_str":"1177845433621569543","indices":[172,195],"media_url":"http://pbs.twimg.com/media/EFiMLm9UYAcYrq-.jpg","media_url_https":"https://pbs.twimg.com/media/EFiMLm9UYAcYrq-.jpg","url":"https://t.co/OnCXC3qcvG","display_url":"pic.twitter.com/OnCXC3qcvG","expanded_url":"https://twitter.com/kim_jakup/status/1177845435857133568/photo/1","type":"photo","sizes":{"thumb":{"w":150,"h":150,"resize":"crop"},"small":{"w":680,"h":386,"resize":"fit"},"large":{"w":1000,"h":568,"resize":"fit"},"medium":{"w":1000,"h":568,"resize":"fit"}}}]}},"quote_count":7,"reply_count":2,"retweet_count":26,"favorite_count":3,"entities":{"hashtags":[],"urls":[{"url":"https://t.co/Oi9Mqw9ndh","expanded_url":"https://twitter.com/i/web/status/1177845435857133568","display_url":"twitter.com/i/web/status/1…","indices":[116,139]}],"user_mentions":[],"symbols":[]},"favorited":false,"retweeted":false,"possibly_sensitive":false,"filter_level":"low","lang":"ko"},"quoted_status_permalink":{"url":"https://t.co/gCgg5m7j2b","expanded":"https://twitter.com/kim_jakup/status/1177845435857133568","display":"twitter.com/kim_jakup/stat…"},"is_quote_status":true,"extended_tweet":{"full_text":"여유로워서... 연성교환... 구해봅니다..\n\n저는 디자인이고\n\n교환은 수공예 그림 글 작곡 등 장르 가리지 않습니다~!\n\n차액 입금 가능해요 플텍풀고 멘션주세요!\n\n@cmsn_d @cmsn_M @cmsn_RT @cmsn_w","display_text_range":[0,125],"entities":{"hashtags":[],"urls":[],"user_mentions":[{"screen_name":"cmsn_d","name":"디자인+ 커미션 자동 홍보봇","id":810999468556288000,"id_str":"810999468556288000","indices":[93,100]},
        {"screen_name":"cmsn_M","name":"음악+ 커미션 자동 홍보봇","id":1014719446525476900,"id_str":"1014719446525476864","indices":[101,108]},{"screen_name":"cmsn_RT","name":"그림 커미션 자동 홍보봇","id":856346578331648000,"id_str":"856346578331648000","indices":[109,117]},{"screen_name":"cmsn_w","name":"글+ 커미션 자동 홍보봇","id":888601350988116000,"id_str":"888601350988115968","indices":[118,125]}],"symbols":[]}},"quote_count":0,"reply_count":0,"retweet_count":0,"favorite_count":0,"entities":{"hashtags":[],"urls":[{"url":"https://t.co/VgOE0PA6Fb","expanded_url":"https://twitter.com/i/web/status/1179790868309368834","display_url":"twitter.com/i/web/status/1…","indices":[110,133]}],"user_mentions":[{"screen_name":"cmsn_d","name":"디자인+ 커미션 자동 홍보봇","id":810999468556288000,"id_str":"810999468556288000","indices":[93,100]},{"screen_name":"cmsn_M","name":"음악+ 커미션 자동 홍보봇","id":1014719446525476900,"id_str":"1014719446525476864","indices":[101,108]}],"symbols":[]},"favorited":false,"retweeted":false,"filter_level":"low","lang":"ko","timestamp_ms":"1570119037116"}]}
        //모든 봇에 인용트를 리트윗 요청을 했다...
        //let res = await snbot.catchWebHookEvent(reqBody)
        //console.log(res);
        //expect( res && res.promoted ).exist
    })
    it('아이템 삭제', async function(){
        let res = await abot.removeItemByTweetID('1133078391085625344')
        expect(res).exist
    })
    it('welcome message set', async function(){
        //let res = await abot.setDmWelcome({welcome_message: {name:'wm-test', message_data:{text:'hello!'}}})
        let res // = await abot.setDmWelcomeRule('1179484829303263237');

        //let res = await abot.setDmWelcome({welcome_message: {name:'welcome',  message_data: dmReply.reply.welcome_message}} )
        console.log(res)
        expect(res).exist;
    })
    it('bot parse intent', async function(){
        let find = await snbot.parseIntent('커미션 찾습니다')
        expect(find).equal('find')
        let open = await snbot.parseIntent('커미션 열었어요')
        expect(open).equal('open')
    })
    it('renew item by tweet', async function(){
        let itemTweet = await abot.getTweet('1133079047410348032')
        await abot.renewItemByTweet(itemTweet)
    })
    it('date diff', async ()=>{
        let item = await snbot.Database.Item.findOne({id:'1180621246557327360'})
        const date1 = new Date(item.departedAt)
        const date2 = Date.now()
        const diff = snbot.getDateDiffHours(date1, date2);

        console.log(diff)
        expect(diff).exist
    })
    it('user usage analyse', async () =>{
        let bot = await snbot.AutoBotFactory({code: 'art'})
        let user = await snbot.Database.User.findOne({name: 'macarong_gumi'})
        let itemTweet = await bot.getTweet('1181256995921252361');
        let res = await bot.analyseUserUsage(user, itemTweet)
        console.log(res)
    })
    it.only('tweet check quoted', async () => {
      let bot = await snbot.AutoBotFactory({code: 'test'})
        let itemTweet = await bot.getTweet('1081457669070680065');
        console.log(snbot.isQuotedTweet(itemTweet))
    })
})

