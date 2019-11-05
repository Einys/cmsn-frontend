"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const model_bot_1 = require("../data/model.bot");
const model_data_1 = require("../data/model.data");
const filter = require("../filter");
dotenv.config();
mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true, useFindAndModify: true }, function (err) {
    if (err)
        console.log(err);
    else
        console.log('Mongodb connected : ', process.env.DATABASE_URI);
});
async function updateBot() {
    let bot = await model_bot_1.default.findOne({ name: 'test' });
    let layers = [];
    let content = [new filter.Operand(['blacklist'], 'filter'), new filter.Operand(['itemid']), new filter.Operand(['item', 'id'], 'target'), filter.operator('find')];
    let eq1 = new filter.Equation(content);
    let layer1 = { be: 'ex', condition: eq1, index: 'itemBlacklist' };
    layers.push(layer1);
    let content2 = [new filter.Operand(['blacklist'], 'filter'), new filter.Operand(['userid']), new filter.Operand(['user', 'id'], 'target'), filter.operator('find')];
    let eq2 = new filter.Equation(content2);
    let layer2 = { be: 'ex', condition: eq2, index: 'userBlacklist' };
    layers.push(layer2);
    let content3 = [new filter.Operand(['itweet', 'text'], 'target'), new filter.Operand(['word', 'BADWORD'], 'filter'), filter.operator('incl')];
    let eq3 = new filter.Equation(content3);
    let layer3 = { be: 'ex', condition: eq3, index: 'badword' };
    layers.push(layer3);
    bot.filterLayers = layers;
    bot.threadOption = { all: true };
    return bot.save();
}
function updateBotFunc() {
    return updateBot().then((res) => {
    }).then(() => {
        return mongoose.connection.close();
    }).catch(err => {
        console.log(err);
    });
}
const words = {
    "ART": ["그림", "두상", "흉상", "반신", "전신", "허벅지", "SD"],
    "ART_PORTION": ["두상", "흉상", "반신", "전신", "허벅지", "SD"],
    "ASKPOSSIBLE": ["가능한 분", "해주실 분", "해주실 수 있", "가능하신", "해주실분"],
    "BADWORD": ["씨발", "시발", "시팔", "파쿠리", "지랄", "염병", "썅년", "쌍년", "미친년", "또라이", "병크", "좆같", "븅신", "병신", "놈이", "썩을년", "닥쳤으면", "닥쳐", "좆빨", "필터링", "rhoncus"],
    "CATEGORY": ["선호", "스타일", "장르", "캐릭터"],
    "COMMISSION": ["커미션", "커미숀", "컴션", "귀미션", "컴숀", "커뮈숀", "커뮈션", "커 미 션"],
    "DRAW": ["그려드려요", "그립니다", "그려요", "그려드립", "그려드리"],
    "DRAWABLE": ["그려주실", "그리실 수 있는", "그리시는", "그리실", "그려주실", "그려주시는", "받아주실", "받으시는", "받고계신", "받아주시는"], "FIND": ["찾아요", "찾습니", "구하고 있", "구합", "구해", "찾아봐요", "찾고 있", "찾고있", "찾는 중", "찾아봅", "신청하려", "신청 하려", "신청 하고자", "신청 원합", "신청 원해", "신청원합", "신청원해", "신청하고자", "신청하고 싶어", "신청하고 싶습"], "FINDING_ME": ["홍보봇 어딨", "홍보봇 뭐였", "홍보봇 아이디 뭐", "홍보봇 계정 뭐였", "홍보봇 계정 아는", "홍보봇 계정 알고", "홍보봇 계정 아시는"], "FIND_WEEK": ["찾"], "GENRE": [], "ILBE": ["무현", "운지", "자연인", "노무", "놈현", "이기야", "꼴페미", "메갈", "고무통", "노부엉", "야 기분좋다", "핵대중", "자연 속에 내가", "노알라", "슨상", "쿵쾅", "문재앙", "트페미", "보겸"], "LIKE": ["하트이모티콘들"], "MAYNOT_ART": ["캘리", " 글", "타로", "보이스", "00자", "공백포함", "공포", "공미포"], "MONEY": ["급전", "병원비", "교통비", "용돈", "차비", "목표액", "목표 금액", "목표금액", "생계형", "돈이없", "돈이 없", "생활비"], "MONEY_COUNTING": ["00원", "만원", "천원"], "NEGATIVE": ["못그리", "못그려", "무섭", "무서워", "꺼려", "싫", "잘못", "하찮", "현타", "자괴감", "논란", "짜증", "소름", "빡쳐", "빡친", "화나", "화가 나", "화가나", "화난다", "쓰레기", "장난하", "예민", "마세요", "불편", "말아주", "말아 주", "어이 없", "어이없"], "NOT_ART": ["글 커미션", " 글", "타로", "보이스", "00자", "공백포함", "공포", "공미포"], "NOT_COMMISSION": ["외주"], "NO_ETC": ["지인제", "지인 한정", "1차지인", "2차지인", "차 지인", "지인한정"], "OPEN": ["열었", "열려있", "개장했", "열어요", "오픈", "OPEN", "커미션입니다", "여는", "슬롯", "션 받습", "션받습", "션 받아", "션받아", "션을 받습", "션을 받아", "받습니다", "받아봅니다", "받아요", "받고 있어", "받고 있습", "받아봅", "받는 중입", "받고있습", "받는중입", "신청해주", "열어보는", "신청은 디엠", "디엠으로 신청", "받을게", "Lorem"], "OPEN_WEEK": ["엽니다", "개장"], "POLITE": ["부탁드", "요청드", "감사", "고맙", "thx", "보세요", "주세요", "드려요", "드립니다", "합니다", "습니다"], "PORN": ["꾸금", "19금", "야짤", "R-18", "R18", "떡커미션", "떡 커미션", "🔞"], "PREFER": [], "RETWEET": ["RT", "rt", "알티", "리트윗", "홍보"], "STYLE": [], "UNPOLITE": ["니가", "니새끼", "새끼", "잖아."]
};
const groupFilterLayer = function () {
    let layers = [];
    let content = [new filter.Operand(['blacklist'], 'filter'), new filter.Operand(['itemid']), new filter.Operand(['item', 'id'], 'target'), filter.operator('find')];
    let eq1 = new filter.Equation(content);
    let layer1 = { be: 'ex', condition: eq1, index: 'itemBlacklist' };
    layers.push(layer1);
    let content2 = [new filter.Operand(['blacklist'], 'filter'), new filter.Operand(['userid']), new filter.Operand(['user', 'id'], 'target'), filter.operator('find')];
    let eq2 = new filter.Equation(content2);
    let layer2 = { be: 'ex', condition: eq2, index: 'userBlacklist' };
    layers.push(layer2);
    let content3 = [new filter.Operand(['itweet', 'text'], 'target'), new filter.Operand(['word', 'BADWORD'], 'filter'), filter.operator('incl')];
    let eq3 = new filter.Equation(content3);
    let layer3 = { be: 'ex', condition: eq3, index: 'badword' };
    layers.push(layer3);
    return { cmsn: layers };
};
function setData(index, data) {
    return model_data_1.default.findOneAndUpdate({ index: index }, { data: data }, { upsert: true, new: true });
}
function setWords() {
    return setData('words', words).then(res => {
        console.log('result : ', res);
        mongoose.disconnect();
    });
}
function setGroupFilters() {
    return setData('groupFilters', groupFilterLayer()).then(res => {
        console.log('result : ', res);
        mongoose.disconnect();
    });
}
function main() {
    setGroupFilters();
}
main();
//# sourceMappingURL=db.js.map