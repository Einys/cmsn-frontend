import * as mongoose from 'mongoose';
export interface DataDoc extends mongoose.Document {
    index: string;
    data: any;
}
export interface DataStatic extends mongoose.Model<DataDoc> {
    /**
     * return data by index
     * @param index string
     */
    findbyIndex(index: string): any;
}
declare const _default: DataStatic;
export default _default;
