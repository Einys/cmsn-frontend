//@ts-check
var express = require('express');
var router = express.Router();
var createError = require('http-errors');
var bodyParser = require('body-parser');

let ItemController = require('@einys/snbot/dist/controller/item')
let BotController = require('@einys/snbot/dist/controller/bot')
let AuthController = require('@einys/snbot/dist/controller/auth')
let UserController = require('@einys/snbot/dist/controller/user')
let DataController = require('@einys/snbot/dist/controller/server-data')
let ChatEventController = require('@einys/snbot/dist/controller/chatevent')

/* GET data. */
router.use('/items', ItemController.default);
router.use('/bots', BotController.default);
router.use('/auths', AuthController.default);
router.use('/users', UserController.default);
router.use('/chatevent', ChatEventController.default);

router.get('/', (req, res) => {
  res.sendStatus(200)
})

router.get('/error', (req, res) => {
  res.sendStatus(200);
})

router.options('/error', (req, res) => {
  console.log('!OPTIONS');
  res.writeHead(200);
  res.end();
})

router.post('/error', function (req, res, next) {
  // query 는 헤더에 붙인거
  // params 는 url 에 들어온거
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log('[SPA ERROR] ip ', ip);
  console.log(req.body);
  res.sendStatus(200);
});

// catch 404 and forward to error handler
router.use(function (req, res, next) {
  next(createError(404));
});

module.exports = router;
