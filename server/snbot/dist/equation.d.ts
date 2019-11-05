export declare type operator = '+' | '-' | '*' | '/' | '<' | '<=' | '>' | '==' | '!=' | 'incl' | '&&' | '||' | 'find' | '!';
export declare function operator(o: operator): operator;
export declare type ref = {
    inclCount?: number;
    keyChain: Array<string>;
};
export declare class Operand {
    source: 'target' | 'filter';
    key: any;
    incl: number;
    operand: boolean;
    function: boolean;
    regexp: boolean;
    /**
     *
     * @param key 피연산자 자체이거나 ref의 키들(중첩 키는 배열로 가능)
     * @param source 'target(dynamic object)' 또는 'filter'
     * @param incl incl연산의 included로 쓰일 경우 여기서 최소한 몇 개를 포함해야 하는지
     */
    constructor(key: any, source?: 'target' | 'filter', incl?: number);
    val(ref?: any): any;
}
export declare const operation: {
    '+': (a: any, b: any) => any;
    '-': (a: any, b: any) => number;
    '*': (a: any, b: any) => number;
    '/': (a: any, b: any) => number;
    '<': (a: any, b: any) => boolean;
    '<=': (a: any, b: any) => boolean;
    '>=': (a: any, b: any) => boolean;
    '>': (a: any, b: any) => boolean;
    '==': (a: any, b: any) => boolean;
    '!=': (a: any, b: any) => boolean;
    'incl': (included: any, includes: any) => any;
    'find': (value: any, key: string, database: {
        find: (query: any) => any;
    }) => any;
    '&&': (a: any, b: any) => any;
    '||': (a: any, b: any) => any;
    '!': (a: any) => boolean;
};
export declare function calculate(equation: Array<Operand | operator>, ref?: any, filterData?: any): Promise<any>;
export declare function makeFind(list: Operand, key: Operand, value: Operand): Equation;
export declare class Equation {
    content: Array<Operand | operator>;
    constructor(content: any);
    calculate(ref?: any, filterData?: any): Promise<any>;
}
