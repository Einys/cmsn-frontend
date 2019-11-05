import * as mongoose from 'mongoose';
export interface User {
    id: string;
    name: string;
    profileName: string;
    profileImg: string;
    profile_img: string;
    email: string;
    sns: string;
    lastVisit: number;
    _items: [string];
    twitterOauth: {
        token: string;
        tokenSecret: string;
    };
    protected: boolean;
    lang: [string];
    admin: boolean;
}
export declare type UserDoc = User & mongoose.Document;
export declare const userSchema: mongoose.Schema<any>;
declare const _default: mongoose.Model<UserDoc, {}>;
export default _default;
