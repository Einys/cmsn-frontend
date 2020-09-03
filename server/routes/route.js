//@ts-check
var express = require('express');
var router = express.Router();
var createError = require('http-errors');
var bodyParser = require('body-parser');

let ItemController = require('snbot/data/controller.item')
let BotController = require('snbot/data/controller.bot')
let AuthController = require('snbot/data/controller.auth')
let UserController = require('snbot/data/controller.user')
let DataController = require('snbot/data/controller.data')
let ChatEventController = require('snbot/data/controller.chatevent')
//@ts-ignore
let ClientErrController // = require('snbot/data/controller.clienterr')

if (process.env.SNBOT_LOCAL && process.env.SNBOT_LOCAL !== '0' && process.env.SNBOT_LOCAL_ENABLED && process.env.SNBOT_LOCAL_ENABLED !== '0') {
  console.log('[server] local router enabled')
  ItemController = require('../' + process.env.SNBOT_LOCAL + '/data/controller.item')
  BotController = require('../' + process.env.SNBOT_LOCAL + '/data/controller.bot')
  AuthController = require('../' + process.env.SNBOT_LOCAL + '/data/controller.auth')
  UserController = require('../' + process.env.SNBOT_LOCAL + '/data/controller.user')
  DataController = require('../' + process.env.SNBOT_LOCAL + '/data/controller.data')
  ChatEventController = require('../' + process.env.SNBOT_LOCAL + '/data/controller.chatevent')
  ClientErrController = require('../' + process.env.SNBOT_LOCAL + '/data/controller.clienterr')
} else {
  console.log('[server] npm module router enabled')
}

/* GET data. */
router.use('/items', ItemController.default);
router.use('/bots', BotController.default);
router.use('/auths', AuthController.default);
router.use('/users', UserController.default);
router.use('/chatevent', ChatEventController.default);

/* error */
router.post('/error', ClientErrController ? ClientErrController.default : function (req, res, next) {

  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log('[SPA ERROR] ip ', ip);
  res.locals.clientIp = ip;
  console.log(req.body);

  next()
});

router.get('/', (req, res) => {
  res.sendStatus(200)
})

// catch 404 and forward to error handler
router.use(function (req, res, next) {
  next(createError(404));
});

module.exports = router;
