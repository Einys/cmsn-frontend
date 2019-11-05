const router = require('express').Router()
import * as tbot from '../abot'

router.get('/dm/welcome/:botID', async function (req, res, next) {

    tbot.AutoBotFactory({ id: req.params.botID })
    .then(bot => {
        return bot.getWelcomeMessage()
    }).then(wm => {
        if (wm)
            res.json(wm)
        else
            res.json({})
    }).catch(err => {
        console.log(err)
        res.status(err.statusCode || 500).send(err)
    })

})

router.get('/dm/welcome/rule', async function (req, res, next) {
    let bot = await tbot.AutoBotFactory({ code: 'test' })
    bot.getWelcomeMessageRule().then(wm => {
        if (wm)
            res.json(wm)
        else
            res.json({})
    }).catch(err => {
        console.log(err)
        res.status(err.statusCode || 500).send(err)
    })
})

type welcome = {
    welcome_message: {
        code: string;
        message_data: {
            text: string;
            attachment?: {
                type: "media";
                media: {
                    "id": string;
                };
            };
        };
    };
}

router.post('/dm/welcome', async function (req, res, next) {
    let bot = await tbot.AutoBotFactory({ code: 'test' })
    console.log('[request] body : ', req.body)

    bot.setDmWelcome(req.body).then(wm => {
        if (wm)
            res.json(wm)
        else
            res.json({})
    }).catch(err => {
        console.log(err)
        res.status(err.statusCode || 500).send(err)
    })
})

router.post('/dm/welcome/rule/:wmid', async function (req, res, next) {
    let bot = await tbot.AutoBotFactory({ code: 'test' })
    console.log('[request]', req.params.wmid)
    console.log('[request] body : ', req.body)

    bot.setDmWelcomeRule(req.params.wmid).then(wmr => {
        if (wmr)
            res.json(wmr)
        else
            res.json({})
    }).catch(err => {
        console.log(err)
        res.status(err.statusCode || 500).send(err)
    })
})

router.delete('/dm/welcome/:wmid', async function (req, res, next) {
    let bot = await tbot.AutoBotFactory({ code: 'test' })
    console.log('[request]', req.params.wmid)
    console.log('[request] body : ', req.body)

    bot.deleteDmWelcome(req.params.wmid).then(wm => {
        if (wm)
            res.json(wm)
        else
            res.json({})
    }).catch(err => {
        console.log(err)
        res.status(err.statusCode || 500).send(err)
    })
})

router.delete('/dm/welcome/rule/:rid', async function (req, res, next) {
    let bot = await tbot.AutoBotFactory({ code: 'test' })
    console.log('[request]', req.params.rid)
    console.log('[request] body : ', req.body)
    bot.deleteDmWelcomeRule(req.params.rid).then(wm => {
        if (wm)
            res.json(wm)
        else
            res.json({})
    }).catch(err => {
        console.log(err)
        res.status(err.statusCode || 500).send(err)
    })
})

export default router
