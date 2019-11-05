
import * as mongoose from 'mongoose';

export interface User {
    id: string //of twitter
    name: string, //of twitter
    profileName: string,
    profileImg: string,
    profile_img: string, //depreciated
    email: string,
    sns: string,
    lastVisit: number,
    _items: [string],
    twitterOauth: {
        token: string,
        tokenSecret: string
    }
    protected: boolean,
    lang: [string],
    admin: boolean
}

export type UserDoc = User & mongoose.Document

export const userSchema = new mongoose.Schema({
    id: { type: String, unique: true }, // twitter 숫자코드
    name: String, // ex. cmsn_RT
    profileName: String, //ex. 세메센
    profileImg: String,
    profile_img: String, //depreciated
    email: String,
    sns: String,
    lastVisit: Date,
    _items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
    twitterOauth: Object,
    protected: Boolean,
    admin: Boolean,
    lang: [String]
}, {
        timestamps: true
    });

import debug from 'debug';
import * as path from 'path'
import * as pack from '../package.json';
const d = debug(pack.name + ':' + path.basename(__filename))

userSchema.post('save', function (doc) {
    d(`${doc.id} has been saved`)
    return doc
});
userSchema.post('remove', function (doc) {
    d(`${doc.id} has been removed`)
    return doc
});
userSchema.post('update', function (doc) {
    d(`${doc.id} has been removed`)
    return doc
});


export default mongoose.model<UserDoc>('User', userSchema);
