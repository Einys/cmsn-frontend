import Tbot, { Bot, Twit } from './bot';
import * as Data from './data/a.data.mongoose';
import { Operand, operator, Equation } from './equation'

import debug from 'debug';
import * as path from 'path'
const pack = require('./package.json')
const d = debug(pack.name + ':' + path.basename(__filename))

//Badword, goodword 같은건 여기에 static 데이터로, 
//이 외부 파일에서 filter를 선언할 때 db에서 읽어들여 초기화 될 것이다...........
//equation ref 에서 filter 를 참조하도록 하면 그 데이터가 읽어질것이다!
export { Equation, Operand, operator }

export type filterLayer = {
    be: 'in' | 'ex',
    index?: string,
    condition: Equation
}

export class Filter {

    data: filterData
    layers: filterLayer[]

    constructor(filterLayers: filterLayer[], filterData?: filterData) {
        this.layers = filterLayers
        this.data = filterData
    }

    filterTweet(requestTweet: Twit.Twitter.Status, user: Data.user.UserDoc, itemTweet: Twit.Twitter.Status, item: Data.item.ItemDoc) {
        let target : filterRefs = {
            user: user,
            req: requestTweet,
            itweet: itemTweet,
            item: item
        }
        return this.filtering(target)
    }

    //filtering(requestTweet: Twit.Twitter.Status, user: Data.user.UserDoc, itemTweet: Twit.Twitter.Status) {
    async filtering(target: filterRefs) {
        /*
        let target = {
            user: user,
            req: requestTweet,
            item: itemTweet
        }
        */
        if (!this.data)
            throw new Error('Filter must have data. Set data first.')

        //필터레이어
        for (let l of this.layers) {
            d(l);
            if(!(l && l.condition))
                continue; //레이어가 비었을 경우 다음 레이어로
            let ok = (l.be === 'in') ? true : false // l.be === 'in' 이 true인 경우, 필터에 뭔가 걸리면(calculate가 true 이거나 어떤 값이면) ok:true 가 되고, 이 값이 false이면, 필터에 뭔가 걸리면 ok:false 가 된다.
            let equation = new Equation(l.condition.content)
            let res = await equation.calculate(target, this.data)
            if (res)
                return { ok: ok, index: l.index, res: res }
        }

        

        return { ok: true, index: 'end' }
    }

    setFilterLayers(layers: filterLayer[]) {
        this.layers = layers
    }

    getFilterData() {
        return this.data
    }
    setFilterData(data: filterData) {
        this.data = data
    }

}

export type filterRefs = {
    user: any,
    req: any,
    itweet?: any,
    item: any
}
// 외부에서 초기화할 때 데이터베이스에서 읽어온다...
export type filterData = {
    name: string,
    cat: string,
    lang: string,
    word: any,
    blacklist: {
        find : Function
    }
}

