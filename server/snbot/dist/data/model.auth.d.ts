import * as mongoose from 'mongoose';
export interface AuthDoc extends mongoose.Document {
    _id: any;
    key: string;
    secret: string;
    name: string;
    usage: string;
    memo: string;
}
declare const _default: mongoose.Model<AuthDoc, {}>;
export default _default;
