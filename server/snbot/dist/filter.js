"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const equation_1 = require("./equation");
exports.Operand = equation_1.Operand;
exports.operator = equation_1.operator;
exports.Equation = equation_1.Equation;
const debug_1 = require("debug");
const path = require("path");
const pack = require('./package.json');
const d = debug_1.default(pack.name + ':' + path.basename(__filename));
class Filter {
    constructor(filterLayers, filterData) {
        this.layers = filterLayers;
        this.data = filterData;
    }
    filterTweet(requestTweet, user, itemTweet, item) {
        let target = {
            user: user,
            req: requestTweet,
            itweet: itemTweet,
            item: item
        };
        return this.filtering(target);
    }
    //filtering(requestTweet: Twit.Twitter.Status, user: Data.user.UserDoc, itemTweet: Twit.Twitter.Status) {
    async filtering(target) {
        /*
        let target = {
            user: user,
            req: requestTweet,
            item: itemTweet
        }
        */
        if (!this.data)
            throw new Error('Filter must have data. Set data first.');
        //필터레이어
        for (let l of this.layers) {
            d(l);
            if (!(l && l.condition))
                continue; //레이어가 비었을 경우 다음 레이어로
            let ok = (l.be === 'in') ? true : false; // l.be === 'in' 이 true인 경우, 필터에 뭔가 걸리면(calculate가 true 이거나 어떤 값이면) ok:true 가 되고, 이 값이 false이면, 필터에 뭔가 걸리면 ok:false 가 된다.
            let equation = new equation_1.Equation(l.condition.content);
            let res = await equation.calculate(target, this.data);
            if (res)
                return { ok: ok, index: l.index, res: res };
        }
        return { ok: true, index: 'end' };
    }
    setFilterLayers(layers) {
        this.layers = layers;
    }
    getFilterData() {
        return this.data;
    }
    setFilterData(data) {
        this.data = data;
    }
}
exports.Filter = Filter;
//# sourceMappingURL=filter.js.map