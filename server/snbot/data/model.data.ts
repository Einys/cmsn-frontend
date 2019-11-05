import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface DataDoc extends mongoose.Document{
    index: string,
    data: any
}

export interface DataStatic extends mongoose.Model<DataDoc> {
    /**
     * return data by index
     * @param index string
     */
    findbyIndex(index: string): any;
}

const dataSchema = new Schema({
    index: String,
    data: Schema.Types.Mixed
});

dataSchema.statics.findbyIndex = function(index: string): DataDoc["data"] {
    return this.findOne({index:index}).then(res =>{
        return res.data
    })
}



import debug from 'debug';
import * as path from 'path'
import * as pack from '../package.json';
const d = debug(pack.name + ':' + path.basename(__filename))

export default mongoose.model<DataDoc, DataStatic>('Data', dataSchema);
