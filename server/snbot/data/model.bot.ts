import * as mongoose from 'mongoose';
import { cat } from './model.item'
import * as filter from '../filter'
const Schema = mongoose.Schema;

import debug from 'debug';
import * as path from 'path';
import * as pack from '../package.json';
const d = debug(pack.name + ':' + path.basename(__filename))

import { AuthDoc } from './model.auth'

export type threadOption = {
    all: boolean
    passableIds?: string[] // 비어있으면 딱 스레드주 하나만 통과, 차있으면 그 id들도 통과
}

export type keys = {
    consumer: AuthDoc['_id'],
    access: {
        token: string,
        secret: string
    }
}

export interface Ibot {
    _id?: string | Ibot,
    code?: string,
    name?: string,
    id?: string,
    cat?: cat,
    lang?: string,
    keys?: keys,
    memo?: string,
    group?: [string],
    threadOption?: threadOption,
    filterLayers?: filter.filterLayer[],
    conversationMap?: object,
    s3?: {
        auth: AuthDoc['_id'],
        bucket:string,
        region:string
    }  
}

export type botDoc = Ibot & mongoose.Document

export const botSchema = new Schema({
    code: String,
    name: String,
    id: String,
    cat: String,
    lang: String,
    keys: {
        consumer: { type: Schema.Types.ObjectId, ref: 'Auth' },
        access: Object
    },
    memo: String,
    threadOption: Schema.Types.Mixed,
    group: Array,
    filterLayers: Array,
    conversationMap: Object,
    s3: {
        auth: { type: Schema.Types.ObjectId, ref: 'Auth' },
        bucket: String,
        region: String
    }
})

botSchema.pre('find', function () {
    this.populate('keys.consumer');
    this.populate('s3.auth')
})

botSchema.pre('findOne', function () {
    this.populate('keys.consumer').populate('s3.auth');
})


export default mongoose.model<botDoc>('Bot', botSchema);
