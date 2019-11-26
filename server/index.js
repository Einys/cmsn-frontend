const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')

// app
const dotenv = require('dotenv');
dotenv.config()

var createError = require('http-errors');
const express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var request = require('request');
var bodyParser = require('body-parser');

const app = express();


/**
 * Rawbody parser
 * to calculate webhook header sign. (2018.6.15)
 * 웹훅사인은 로우바디 + 컨슈머시크릿
 */
var rawBodySaver = function (req, res, buf, encoding) {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || 'utf8');
  }
}
app.use(bodyParser.json({ verify: rawBodySaver }));
app.use(bodyParser.urlencoded({ extended: false }))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../frontend/dist')));
app.use(express.static(path.join(__dirname, '../frontend/dist/css')));
app.use(express.static(path.join(__dirname, '../frontend/dist/js')));
app.use(express.static(path.join(__dirname, '../frontend/dist/img')));
app.use(express.static(path.join(__dirname, '../dist')));
app.use(express.static(path.join(__dirname, '../dist/css')));
app.use(express.static(path.join(__dirname, '../dist/js')));
app.use(express.static(path.join(__dirname, '../dist/img')));


//CORS policy
const SERVER_URL = process.env.SERVER_URL
app.use((req, res, next) => {
  if (req.get('origin') && req.get('origin').includes(SERVER_URL)) {
    res.header("Content-Type", "text/html");
    res.header('Access-Control-Allow-Origin', `${req.get('origin')}`); // localhost로부터의 요청에 응답한다
    res.header('Access-Control-Allow-Methods', 'PUT, DELETE');
    res.header('Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') { res.sendStatus(200); return; }
  } else {
    console.log('Access-Control - Allow all')
    res.header('Access-Control-Allow-Origin', '*'); // 모든 요청에 응답한다
    res.header('Access-Control-Allow-Methods', 'PUT, DELETE');
    res.header('Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  }
  next();
});

//snbot
const Snbot = require('snbot');
Snbot.connectDatabase(process.env.DATABASE_URI)
const mongoose = require('mongoose');

//Passport Settings
const MongoStore = require('connect-mongo')(session);
app.use(session({
  secret: '@#@$MYSI$!$@!$!@',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 12 }, // 쿠키 유효기간 12시간
  store: new MongoStore({ mongooseConnection: Snbot.Database.Mongoose.connection })
}));
//[Start] Passport
var passport = require('passport')
  , util = require('util')
  , TwitterStrategy = require('passport-twitter').Strategy
  , cookieParser = require('cookie-parser')

//console.log(config);

// Passport session setup.
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

// Use the TwitterStrategy within Passport.

passport.use(new TwitterStrategy({
  consumerKey: process.env.consumer_key,
  consumerSecret: process.env.consumer_secret,
  callbackURL: process.env.callback_url
},
  function (token, tokenSecret, profile, done) {

    //아마도 이것들은 auth/callback 으로 들어오는 데이터인것같다.
    console.log('┌ name : ', profile.username)
    console.log('├ token : ', token)
    console.log('└ secret : ', tokenSecret)
    //그리고 DB에서 찾아서 done 하면 다시 DB의 Session 데이터 안에 저장이 된다.

    return done(null, profile);

  }
));

app.use(passport.initialize());
app.use(passport.session());


app.get('/auth/twitter', passport.authenticate('twitter'));

app.get('/auth/twitter/callback',
  passport.authenticate('twitter', { successRedirect: '/', failureRedirect: '/' }),
  function (req, res) {
    res.redirect('/');
});

app.get('/user', function (req, res) {
  res.send(req.user);
});

app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});


const serverRouter = require('./routes/route');
app.use('/1.0/data', serverRouter);




/**
 * Receives challenge response check (CRC)
 **/
const security = require('./security')
app.get('/twitter', async function (request, response) {

  var crc_token = request.query.crc_token
  console.log('received crc token : ', crc_token);

  if (crc_token) {
    var hash = security.get_challenge_response(crc_token, process.env.consumer_secret)
    response.status(200);
    response.send({
      response_token: 'sha256=' + hash
    })
  } else {
    response.status(400);
    response.send('Error: crc_token missing from request.')
  }
})

app.post('/twitter', async function (req, res) {
  //@ts-ignore

  res.status(200).send('OK');

  // 예정 : DDOS 방어하기...*
  if (!process.env.DEBUG && !process.env.TEST) {
    //디버그모드가 아닐 때 (실제 서버 웹훅으로 들어온 데이터일때)
    let raw = req.rawBody
    console.log('[app.js: post/twitter]  raw : ' + raw);
    let myHmac = security.get_challenge_response(raw, process.env.consumer_secret)
    console.log('[app.js: post/twitter]  MY Hash : sha256=' + myHmac);
    let myHash = 'sha256=' + myHmac;
    let twittersign = req.headers['x-twitter-webhooks-signature'];

    console.log('[app.js: post/twitter]  Hash From twitter : ', req.headers['x-twitter-webhooks-signature']);

    if (!(myHash === twittersign)) {
      console.log('[app.js: post/twitter]  WARNING Data posted came from not twitter');
      return;
    }

    var headers = {
      'User-Agent': 'Super Agent/0.0.1',
      'Content-Type': 'application/json'
    }

    var options = {
      url: 'https://cmsn-beta.herokuapp.com/twitter',
      method: 'POST',
      headers: headers,
      json: req.body
    }

    // Start the request
    request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        // Print out the response body
        console.log('Posted tweet data to Beta server or local(ngrok)')
      } else {
        console.log('Beta server down.', response.statusCode);
      }
    })

  }

  console.log('[app.js] twitter request body : ', JSON.stringify(req.body))
  Snbot.catchWebHookEvent(req.body).catch(err => { console.log(err) });

})


// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
