
import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface AuthDoc extends mongoose.Document{
    _id: any,
    key: string,
    secret: string,
    name: string,
    usage: string,
    memo: string,
}

const authSchema = new Schema({
    key: String,
    secret: String,
    name: String,
    usage: String,
    memo: String,
},{
    timestamps: true
});


import debug from 'debug';
import * as path from 'path'
import * as pack from '../package.json';
const d = debug(pack.name + ':' + path.basename(__filename))

authSchema.post('save', function (doc) {
    d(`${doc.id} has been saved`)
    return doc
});
authSchema.post('remove', function (doc) {
    d(`${doc.id} has been removed`)
    return doc
});


export default mongoose.model<AuthDoc>('Auth', authSchema);
