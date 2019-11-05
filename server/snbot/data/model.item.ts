
import * as mongoose from 'mongoose';
import { UserDoc } from './model.user'

import debug from 'debug';
import * as path from 'path'
import * as pack from '../package.json';
const d = debug(pack.name + ':' + path.basename(__filename))

const Schema = mongoose.Schema;

//미디어 스키마 정의
export type attachment = {
  display_url?: string,
  media_url_https?: string, //depreciated
  src: string, //twimg link
  mediatype?: string
  media?: mediaDoc
}

export type s3key = { //aws s3, cloudfront store
  small?: { w?: number, h?: number, key?: string, location?: string },
  thumb?: { key?: string, location?: string },
}

export interface mediaDoc extends mongoose.Document {
  s3?: s3key,
  origin: string
}

export const mediaSchema = new Schema({
  s3: Object,
  origin: String
})
mediaSchema.pre('save', function(){
  d('media save!')
})

// Subdocument pre-remove middleware
mediaSchema.pre('remove', function (next) {
  console.log('Subdoc pre-remove middleware has fired!')
  next()
})
mediaSchema.pre('findOneAndRemove', function (next) {
  console.log('Subdoc pre-remove middleware has fired!')
  next()
})

mediaSchema.post('remove', function(){
  d('media remove!')
})
mediaSchema.post('findOneAndRemove', function(){
  d('media findOne and Remove!')
})

export type cat = 'all' | 'art' | 'des' | 'wri' | 'mus'
export type intent = 'open' | 'find' | 'und'

export type link = {
  url?: string,
  expanded_url?: string,
  display_url?: string,
  indices?: Array<any>,
  meta?: {
    title?: string,
    image?: string,
    description?: string,
    'twitter:card'?: string
  }
  media?: mediaDoc
}

export interface Iitem {
  _id?: string | Iitem,
  id_num?: number,
  id?: string
  text?: string,
  attachment?: [attachment],
  links?: [link],
  createdAt?: number,
  updatedAt?: number,
  departedAt?: number,
  index?: {
    cat: cat[], // art, des ...
    category?: string, //depreciated
    intent: intent[], // open find
    lang: string[],
    language?: string //depreciated
  },
  suspended?: { cat?: cat[] },
  activated?: boolean,
  retweetid?: string,
  _user?: UserDoc['_id'] | UserDoc ,
}

export type ItemDoc = Iitem & mongoose.Document

export function userTypeGuard(user): user is UserDoc {
  if(user._id){
    return true;
  }else{
    return false;
  }
}

export const itemSchema = new Schema({
  id_num: Number,
  id: { type: String, unique: true },
  text: String,
  attachment: [{
    display_url: String,
    media_url_https: String, //depreciated
    src: String, //twimg link
    media: mediaSchema,
    mediatype: String // don't use 'type' instead of 'mediatype' ... it's reserved key by mongoose
  }],
  links: [{
    url: String,
    expanded_url: String,
    display_url: String,
    indices: Array,
    meta: Object,
    media: mediaSchema
  }],
  departedAt: Date,
  index: {
    cat: { type: [String], index: true }, // art, des ...
    category: String, //depreciated
    intent: { type: [String], index: true }, // o f
    lang: { type: [String], index: true },
    language: String //depreciated
  },
  suspended: { cat: [String] },
  activated: Boolean,
  retweetid: String,
  _user: { type: Schema.Types.ObjectId, ref: 'User' },
}, {
    timestamps: true
  });

itemSchema.index({text: 'text'})

interface itemStatic extends mongoose.Model<ItemDoc>{
  search: (keyString, condition, resultSize, skipNum) => Promise<{list, next}>;
  list: (query, count, skip) => Promise<{list, next}>;
}


// Find All
itemSchema.statics.findAll = function () {
  // return promise
  // V4부터 exec() 필요없음
  return this.find({});
};

// for normal list view
itemSchema.statics.list = async function (query, count, skip) : Promise<{ list: any[], next: any }>{

  let queryObj = query;
  queryObj.activated = true;

  let docs = this.find(queryObj)
    .sort({ 'departedAt': -1 }).skip(skip)
    .limit(count+1).populate('_user');

  
  //let cursor = docs.cursor();

  let res = await docs.exec();
  let list = res.slice(0, count) // array[0]번째부터 ~ count개
  let next = res.slice(count) // array[count] 번째부터 ~끝까지
  //let next = await cursor.next();

  return { list: list, next: next };
}


//18.11.20 검색기능
/**
 * @param keyString String
 * @param condition Object
 * @param skipNum Number
 * @param resultSize Number
 */
itemSchema.statics.search = async function (keyString, condition, count, skipNum) {
  let condObj = condition;
  condObj.activated = true; //activated 되어있는 item만
  console.log('keyString:', keyString)
  if (keyString) {
    condObj.$text = { $search: keyString };
  }

  let query = this.find(condObj).sort({ 'departedAt': -1 }).skip(skipNum).limit(count*2).populate('_user')
  let res = await query.exec();
  let list = res.slice(0, count) // array[0]번째부터 ~ count개
  let next = res.slice(count) // array[count] 번째부터 ~끝까지
  //let next = await cursor.next();

  return { list: list, next: next }
}

/* itemSchema.pre('find', function() {
  this.populate('user');
}); */

itemSchema.post('save', function (doc) {
  d(`${doc.id} has been saved`)
  return doc
});
itemSchema.post('remove', function (doc) {
  d(`${doc.id} has been removed`)
  return doc
});
itemSchema.post('findOneAndRemove', function (doc) {
  d(`${doc.id} has been removed`)
  return doc
});

export default mongoose.model<ItemDoc, itemStatic>('Item', itemSchema);
