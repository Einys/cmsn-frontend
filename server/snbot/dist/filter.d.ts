/// <reference types="twit" />
import { Twit } from './bot';
import * as Data from './data/a.data.mongoose';
import { Operand, operator, Equation } from './equation';
export { Equation, Operand, operator };
export declare type filterLayer = {
    be: 'in' | 'ex';
    index?: string;
    condition: Equation;
};
export declare class Filter {
    data: filterData;
    layers: filterLayer[];
    constructor(filterLayers: filterLayer[], filterData?: filterData);
    filterTweet(requestTweet: Twit.Twitter.Status, user: Data.user.UserDoc, itemTweet: Twit.Twitter.Status, item: Data.item.ItemDoc): Promise<{
        ok: boolean;
        index: string;
        res: any;
    } | {
        ok: boolean;
        index: string;
        res?: undefined;
    }>;
    filtering(target: filterRefs): Promise<{
        ok: boolean;
        index: string;
        res: any;
    } | {
        ok: boolean;
        index: string;
        res?: undefined;
    }>;
    setFilterLayers(layers: filterLayer[]): void;
    getFilterData(): filterData;
    setFilterData(data: filterData): void;
}
export declare type filterRefs = {
    user: any;
    req: any;
    itweet?: any;
    item: any;
};
export declare type filterData = {
    name: string;
    cat: string;
    lang: string;
    word: any;
    blacklist: {
        find: Function;
    };
};
