import { expect } from 'chai';
import AutoBot, * as snbot from '../abot'
import { filter, Database } from '../abot';

const dotenv = require('dotenv')
dotenv.config();

let botConfig: any;
let abot: AutoBot;

describe(' #AutoBot ', async function () {
    this.timeout(100000)
    before(async () => {
        console.log('connecting...')
        snbot.Database.connect(process.env.DATABASE_URI)

        abot = await snbot.AutoBotFactory({code: 'test'})
    })
    it('item get list art open', async function () {
        let res = await snbot.Database.Item.list({ }, 20, 0)
        console.log(res)
        expect(res.list[0]).exist
        expect(res.next[0]).exist
    })
    it('item save version control', async function(){
        let item = await Database.Item.findOneAndUpdate({id:'1234'}, {}, {upsert: true, new: true})
        let item2 = await Database.Item.findOneAndUpdate({id:'1234'}, {}, {upsert: true, new: true})
        item2.text = "my text"
        await item2.save();

        /*
        item.text = "updated"
        let res = await item.save();
        */

        item.text = 'updated'
        let res = await item.updateOne(item)
        console.log(item);
        console.log(res)

        expect(res).exist

        let test = await Database.Item.findOne({id:'1234'});
        if(test){
            test.remove();
        }
    })
    it('search text', async function(){
        let word="sd"
        let regex = new RegExp('\w*'+ word + '\w*');
        let res = await Database.Item.find({ text: { $regex: regex } });
        res.forEach( item => {
            console.log(item.text)
            console.log('ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ')
        });
    })
})

