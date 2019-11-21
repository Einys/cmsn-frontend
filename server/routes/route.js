//@ts-check
var express = require('express');
var router = express.Router();
var createError = require('http-errors');
var bodyParser = require('body-parser');

const ItemController = require('snbot/dist/data/controller.item')
const BotController = require('snbot/dist/data/controller.bot')
const AuthController = require('snbot/dist/data/controller.auth')
const UserController = require('snbot/dist/data/controller.user')
const DataController = require('snbot/dist/data/controller.data')
const ChatEventController = require('snbot/dist/data/controller.chatevent')

/* GET data. */
router.use('/items', ItemController.default);
router.use('/bots', BotController.default);
router.use('/auths', AuthController.default);
router.use('/users', UserController.default);
router.use('/chatevent', ChatEventController.default);

router.post('/error', function (req, res, next) {
    // query 는 헤더에 붙인거
    // params 는 url 에 들어온거
    const ip = req.headers['x-forwarded-for'] ||  req.connection.remoteAddress;

    console.log('[SPA ERROR] ip ', ip);
    console.log(req.body);
    res.status(200);
    res.send('200 OK');
});

// catch 404 and forward to error handler
router.use(function (req, res, next) {
    next(createError(404));
  });

module.exports = router;
