import { Operand, operator, calculate, Equation, ref } from '../equation'
import * as filter from '../filter'

import { expect } from 'chai';
describe(' #Equation ', async function () {
    it('check <=', () => {
        // (10 * 10 - 6 < 90)  :   10 10 * 6 - 90 <
        let eq: Array<Operand | operator> = [
            new Operand(10), new Operand(10), operator('*'), new Operand(6), operator('-'), new Operand(94), operator('<=')
        ]
        expect(calculate(eq)).equal(true)
    })
    it('check ref operand', () => {
        let target = { id: '1234' }
        let o = new Operand('id', 'target' )
        expect(o.val(target)).equal('1234')
    })
    it('check incl, target id', () => {
        let equation = [new Operand(['1234', '2345']), new Operand('id', 'target' ), operator('incl')]
        let target = { id: '1234' }

        expect(calculate(equation, target)).equal('1234')
    })
    it('Equation', () => {
        let e = [new Operand(['1234', '2345']), new Operand('id', 'target' ), operator('incl')]
        let equation = new Equation(e);
        let target = { id: '1234' }

        let cal = equation.calculate(target)
        console.log(cal)
        expect(cal).exist
    })
    it('Array multiple incl', () => {
        let e = [new Operand('we are friend'), new Operand(['I', 'we', 'friend'], null, 2), operator('incl')]
        let equation = new Equation(e);

        let cal = equation.calculate()
        console.log(cal)
        expect(cal).exist
    })
    it('Array multiple incl = false', () => {
        let e = [new Operand('I am student'), new Operand(['I', 'we', 'friend'], null, 2), operator('incl')]
        let equation = new Equation(e);

        expect(equation.calculate()).equal(false)
    })
    it('Array incl false', () => {
        let e = [new Operand('you are student'), new Operand(['I', 'we', 'friend']), operator('incl')]
        let equation = new Equation(e);

        expect(equation.calculate()).equal(false)
    })
    it('object: multiple dynamic key test', () => {

        let obj = { house: { address: 'seoul', resident: { name: 'sim', age: 45 }, size:80 } }
        let keys = ["house", "address"]
        let val = obj;
        for(let key of keys){
            val = val[key]
        }
        expect(val).equal('seoul')
    })
    it('find', async ()=>{
        let list = [{ id:'1', text:'first' }, {id:'2', text:'second'}, {id:'3', text:'third'}]
        let e = [new Operand(list), new Operand('id'), new Operand(['item', 'id'], 'target'),  operator('find')]
        let equation = new Equation(e);

        let target = {
            user: {id:'1234'},
            item: {id:'2', text: '필터 테스트'},
            req: {id:'0000', text:'필터 테스트'}
        }

        let cal = await equation.calculate(target)
        console.log(cal)
        expect(cal.id).equal('2')
    })
    it('find (object ver)', async ()=>{
        let list = { a: { id:'1', text:'first' }, b: {id:'2', text:'second'}, c: {id:'3', text:'third'}}
        let e = [new Operand(list), new Operand('id'), new Operand(['item', 'id'], 'target'),  operator('find')]
        let equation = new Equation(e);

        let target = {
            user: {id:'1234'},
            item: {id:'2', text: '필터 테스트'},
            req: {id:'0000', text:'필터 테스트'}
        }

        let cal = await equation.calculate(target)
        console.log(cal)
        expect(cal.id).equal('2')
    })
    it('function operand', ()=>{
        let o = new Operand(Date.now)
        expect(o.val()).exist
    })
    it('filtering multiple layers', async () => {
        let layers : Array<filter.filterLayer> = []

        let content = [new filter.Operand( ['blacklist'], 'filter'),new filter.Operand(['itemid']), new filter.Operand(['item', 'id'], 'target'), operator('find')  ]
        let eq1 = new filter.Equation(content)
        let layer1 : filter.filterLayer = {be:'ex', condition:eq1, index:'itemBlacklist' }

        layers.push(layer1)

        let content2 = [new filter.Operand( ['blacklist'], 'filter'),new filter.Operand(['userid']), new filter.Operand(['user', 'id'], 'target'), operator('find')  ]
        let eq2 = new filter.Equation(content2)
        let layer2 : filter.filterLayer = {be:'ex', condition:eq2, index:'userBlacklist' }
        layers.push(layer2)

        let content3 = [new filter.Operand(['item', 'text'], 'target'), new filter.Operand( ['word', 'BADWORD'], 'filter'),  operator('incl')  ]
        let eq3 = new filter.Equation(content3)
        let layer3 : filter.filterLayer = {be:'ex', condition:eq3, index:'badword' }
        layers.push(layer3)

        let fData = {
            name: 'art',
            cat: 'art',
            lang:'ko',
            word: { BADWORD : ['hate','curse','damn'] },
            blacklist: [{userid: '1234', reason:'abuse_rude'}, {itemid:'4567', reason:'abuse_porn'}]
        }
        let testFilter = new filter.Filter(layers, fData)

        let target = {
            user: {id:'1234'},
            content: {id:'4567', text: 'damn you'},
            item: {id:'4567', text: 'damn you'},
            req: {id:'0000', text:'thank you'}
        }

        let cal = await testFilter.filtering(target)
        console.log(cal)
        expect(cal.ok).equal(false)
        expect(cal.index).equal(layer1.index)

        let target2 = {
            user: {id:'1234'},
            content: {id:'2345', text: 'damn you'},
            item: {id:'2345', text: 'damn you'},
            req: {id:'0000', text:'thank you'}
        }
        let cal2 = await testFilter.filtering(target2)
        console.log(cal2)
        expect(cal2.ok).equal(false)
        expect(cal2.index).equal(layer2.index)

        let target3 = {
            user: {id:'0909'},
            content: {id:'2345', text: 'damn you'},
            item: {id:'2345', text: 'damn you'},
            req: {id:'0000', text:'thank you'}
        }
        let cal3 = await testFilter.filtering(target3)
        console.log(cal3)
        expect(cal3.ok).equal(false)
        expect(cal3.index).equal(layer3.index)

    })
})


//find 는 operand 3개 (list, key, value 순으로) 필요하다...

