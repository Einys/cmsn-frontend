import * as Data from './data/a.data.mongoose';
import { Query } from 'mongoose';
import {Filter} from './filter'

import debug from 'debug';
import * as path from 'path'
import { type } from 'os';
import { json } from 'body-parser';
import * as pack from './package.json';
const d = debug( pack.name +':'+ path.basename(__filename) )

export type operator = '+' | '-' | '*' | '/' | '<' | '<=' | '>' | '==' | '!=' | 'incl' | '&&' | '||' | 'find'| '!'

export function operator(o: operator) {
    return o
}

export type ref = {
    inclCount? : number
    keyChain: Array<string>
}


export class Operand { //targetRef? or value?

    source: 'target'|'filter' //source는 calculate 할 때 인자로 받는다. ex. calculate(target, filterData)
    key: any //데이터 자체이거나, ref의 키(중첩 키는 배열로 가능)
    incl: number; //incl 연산의 included로 쓰일 경우 최소한 몇 개를 포함해야 하는지
    operand: boolean;
    function: boolean;
    regexp: boolean;

    /**
     * 
     * @param key 피연산자 자체이거나 ref의 키들(중첩 키는 배열로 가능)
     * @param source 'target(dynamic object)' 또는 'filter'
     * @param incl incl연산의 included로 쓰일 경우 여기서 최소한 몇 개를 포함해야 하는지
     */
    constructor(key: any, source?: 'target'|'filter', incl?:number ) {
        this.operand = true;
        this.key = key;
        if( typeof key === 'function')
            this.function = true
        if( key instanceof RegExp)
            this.regexp = true
        if(incl)
            this.incl = incl;
        if (source)
            this.source = source

    }

    //키와 source ref를 보고 그 결과인 피연산자 값(또는 배열)을 도출한다.
    val(ref?) {
        let val;
        if ( this.function && !(this.regexp)){
            //데이터가 함수인 경우
            val = this.key()
        }else{
            if (this.source) {
                if (!ref)
                    throw 'This operand needs reference as parameter : ' + JSON.stringify(this)
    
                //ref object의 n중첩 키 값... ex. ['item', 'link'] 는 ref.item.link
                val = getNestedObjectValue(this.key, ref)
    
            } 
            else {
                val = this.key
            }
    
            if(Array.isArray(val) && this.incl){
                val.unshift(this.incl)
                d(`unshifted res : ${val}`)
            }
        }

        return val
    }
}


export const operation = {// + - * / this.incl < > =< => == && ||
    '+': (a, b) => b + a,
    '-': (a, b) => b - a,
    '*': (a, b) => b * a,
    '/': (a, b) => b / a,
    '<': (a, b) => b < a,
    '<=': (a, b) => b <= a,
    '>=': (a, b) => b >= a,
    '>': (a, b) => b > a,
    '==': (a, b) => b === a,
    '!=': (a, b) => b !== a,
    'incl': function (included: any | any[], includes: any | any[]) {
        if(Array.isArray(included)){
            let count = 1;

            // included: Array 의 맨 앞이 숫자(카운트)이면 그 갯수만큼이 포함되어야 true이다.
            if( typeof included[0] === 'number' )
                count = included.shift() //카운트 꺼냄
            
            let inclResult = []
            for( const el of included ){
                if( incl(el, includes) ){
                    inclResult.push(el)
                    if( --count === 0)
                        return inclResult; 
                }
            }
            return false
        }else{
            //included가 배열이 아닌 평문인경우
            if(incl(included, includes))
                return included // 포함된 엘리먼트 리턴
            else
                return false
        }

        function incl(sub, big){
            if (Array.isArray(big)) {
                return big.includes(sub)
            } else if( sub instanceof RegExp && typeof big === 'string' ){
                return sub.test(big)
            }
            else if (typeof sub === 'string' && typeof big === 'string') {
                return big.includes(sub)
            } else {
                return big === sub
            }
        }
    },
    'find': ( value:any, key:string, database : {find:(query : any) => any } ) =>{ //find 는 operand 3개 (list, key, value 순으로) 필요하다...
        let query = {}
        query[key] = value
        d('find?')
        d(query)
        return database.find(query)
    },
    '&&': (a, b) => b && a,
    '||': (a, b) => b || a,
    '!': (a) => !a
}

function getNestedObjectValue(key: string|string[], obj: any){
    d('getNestedOb: key: '+ key)
    let res;
    if( Array.isArray(key) ){
        let val = obj;
        for(const k of key){
            if(val !== undefined && val !== null)
                val = val[k]
        }
        res = val
    }else{
        res = obj[key]
    }
    d('getNestedOb: ')
    d(res)
    return res;
}

export async function calculate(equation: Array<Operand | operator>, ref?: any, filterData?: any) {
    let pgOperandQueue = []
    d(`ref : ${ref}, data : ${filterData}`)
    d(filterData)

    for (const el of equation) {
        try {
            if (el instanceof Operand) {
                d('el?')
                d(el)
                if(!el.source){
                    pgOperandQueue.push(el.val())
                }else if(el.source === 'filter'){
                    pgOperandQueue.push(el.val(filterData))
                }else if(el.source === 'target'){
                    pgOperandQueue.push(el.val(ref))
                }
                d(`queue : ${JSON.stringify(pgOperandQueue)} `)
            }   else if( el === '!'){// ! 는 operand 1개 필요하다...
                let val = pgOperandQueue.pop() ;
                d(` not : ${val}`)
                val = operation['!'](val)
                pgOperandQueue.push(val)
            } 
            else if( el === 'find'){ //find 는 operand 3개 (list, key, value 순으로) 필요하다...
                let val = pgOperandQueue.pop() ;
                let key = pgOperandQueue.pop() ;
                let list = pgOperandQueue.pop() ;
                let res = await operation['find'](val, key, list)
                pgOperandQueue.push(res)
            } 
            else {
                d(`operator: ${el}`)
                let a = pgOperandQueue.pop()
                let b = pgOperandQueue.pop()
                let res = operation[el](a, b)
                d(`a:${a}, b:${b}, RES : ${res}`)
                pgOperandQueue.push(res)
                d(`queue : ${JSON.stringify(pgOperandQueue)} `)
            }
        } catch (error) {
           d(`element : ${ JSON.stringify(el) } caused error ${error.message}`)
           throw error
        }
    }
    return pgOperandQueue[0]
}

export function makeFind(list: Operand, key:Operand, value:Operand){

    let e = new Equation([list, key, value, operator('find')])
    return e
}


export class Equation {
    content: Array<Operand | operator>
    constructor( content: any ){

        /**
         * operand 또는 operator 들로 구성된 array 인지
         * @param arr 
         */
        function isOp( arr : any[] ){
            for(let a of arr){
                let op = a instanceof Operand || a instanceof operator
                if(!op)
                    return false
            }
            return true
        }
        if(isOp(content))
        //맞다면
            this.content = content
        else{
        //아니고 그냥 밋밋한 object라면
            d(content)
            let arr = []
            for( let c of content){
                if(c.operand){
                    arr.push( new Operand(c.key, c.source, c.incl))
                }else{
                    arr.push( operator(c) )
                }
            }
            d(arr)
            this.content = arr
        }
    }
    calculate(ref?: any, filterData?:any) {
        return calculate(this.content, ref, filterData)
    }
};
