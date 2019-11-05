import * as Mongoose from "mongoose";
import Item, * as item from './model.item';
import User, * as user from './model.user';
import Req, * as req from './model.req';
import Bot, * as bot from './model.bot'
import Blacklist, * as blacklist from './model.blacklist'
import Report, * as report from './model.report'
import Auth, * as auth from './model.auth'
import Data, * as data from './model.data'
import Chat, * as chat from './model.chat'


import debug from 'debug';
import * as path from 'path'
import * as pack from '../package.json';
const d = debug(pack.name + ':' + path.basename(__filename))



export { Mongoose, Item, User, Req, Bot, Blacklist, Report, Auth, Data, Chat}
export { item, user, req, bot, blacklist, report, auth, data, chat }

export function connect(uri: string) {
    if (Mongoose.connection.readyState) {
        console.log('MongoDB already connected')
        return;
    }
    Mongoose.set('useFindAndModify', false); //이거안하면 update에서 $set오류나고 depreciated 경고도 남
    return Mongoose.connect(uri, { useNewUrlParser: true }).then((mongoose) => {
        console.log('MongoDB connected')
        if (process.env.NODE_ENV !== 'production')
            console.log(uri)
    })
}

export function disconnect() {
    d('Mongodb disconnected')
    return Mongoose.connection.close()
}
