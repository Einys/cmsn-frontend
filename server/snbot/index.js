const app = require('./dist/asnbot')

app.connectDatabase(process.env.DATABASE_URI)
async function main(){
    let bot = await app.AutoBotFactory({code:'test'})
    console.log(bot.getbotID(), ' bot connected')
}

main()