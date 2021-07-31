const consola = require("consola");
const { Nuxt, Builder } = require("nuxt");

// app
const dotenv = require("dotenv");

// .dev env 를 필요하면 먼저 로드 (덮어씌워지지 않음)
const path = require("path");
if (process.env.NODE_ENV === "development") {
	let p = path.resolve(process.cwd(), ".env.dev");
	dotenv.config({ path: p });
	console.log("[server] dotenv dev enabled", p);
  console.log("· This process")
  console.log("· Don't : ")
  console.log("·    twitter post ")
  console.log("· Do : ")
  console.log("·    twitter get")
  console.log("·    test database modification ")
  console.log("· Check ㅡ .env.dev, ecosystem.config ㅡ files for sure!")
}

dotenv.config();

console.log("[server] NODE_ENV : ", process.env.NODE_ENV);
console.log("[server] TWITTER_NOPOST : ", process.env.TWITTER_NOPOST);
console.log("[server] DEBUG : ", process.env.DEBUG);
console.log("[server] TEST : ", process.env.TEST);
console.log("[server] dotenv enabled : ", process.env.DOTENV_ENABLED);

/**
 *
 * snbot
 *
 */
let Snbot = require("@einys/snbot");

/**
 *
 * snbot
 * logger
 *
 */
let loggerBot = {};
if( Snbot.logger ){
  console.log('[server] snbot logger')
  loggerBot.error = Snbot.logger.error ? Snbot.logger.error.bind(Snbot.logger) : console.error
  loggerBot.info = Snbot.logger.info ? Snbot.logger.info.bind(Snbot.logger) : console.log
} else {
	loggerBot.error = console.error;
	loggerBot.info = console.log;
}
if (
	typeof loggerBot.error === "function" &&
	typeof loggerBot.info === "function"
) {
	console.log("[server] logger OK");
} else {
	throw new Error("loggerBot.error, loggerBot.info must be function");
}

/**
 *
 * express
 *
 */
var createError = require("http-errors");
const express = require("express");

var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");
var request = require("request");
var bodyParser = require("body-parser");

const app = express();

/**
 * Rawbody parser
 * to calculate webhook header sign. (2018.6.15)
 * 웹훅사인은 로우바디 + 컨슈머시크릿
 */
var rawBodySaver = function(req, res, buf, encoding) {
	if (buf && buf.length) {
		req.rawBody = buf.toString(encoding || "utf8");
	}
};
app.use(bodyParser.json({ verify: rawBodySaver }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../frontend/dist")));
app.use(express.static(path.join(__dirname, "../frontend/dist/css")));
app.use(express.static(path.join(__dirname, "../frontend/dist/js")));
app.use(express.static(path.join(__dirname, "../frontend/dist/img")));
app.use(express.static(path.join(__dirname, "../dist")));
app.use(express.static(path.join(__dirname, "../dist/css")));
app.use(express.static(path.join(__dirname, "../dist/js")));
app.use(express.static(path.join(__dirname, "../dist/img")));

/**
 *
 * CORS policy
 *
 */
const SERVER_URL = process.env.SERVER_URL;
app.use((req, res, next) => {
	if (req.get("origin") && req.get("origin").includes(SERVER_URL)) {
		res.header("Content-Type", "text/html");
		res.header("Access-Control-Allow-Origin", `${req.get("origin")}`); // localhost로부터의 요청에 응답한다
		res.header("Access-Control-Allow-Methods", "PUT, DELETE");
		res.header(
			"Access-Control-Allow-Headers",
			"Origin, X-Requested-With, Content-Type, Accept, Authorization"
		);
		if (req.method === "OPTIONS") {
			res.sendStatus(200);
			return;
		}
	} else {
		console.log("Access-Control - Allow all");
		res.header("Access-Control-Allow-Origin", "*"); // 모든 요청에 응답한다
		res.header("Access-Control-Allow-Methods", "PUT, DELETE");
		res.header(
			"Access-Control-Allow-Headers",
			"Origin, X-Requested-With, Content-Type, Accept, Authorization"
		);
	}
	next();
});

Snbot.connectDatabase(process.env.DATABASE_URI);

/**
 * Passport Settings
 *
 * 인증원리 참고
 1 - /login 요청

2 - passport.authenticate("local", (error,user, message)  --->  localStrategy.js 실행

3 - localStrategy에서 form으로 부터 입력받은 값으로 db에서 사용자 조회. 경우를 고려하여 done()함수 실행

4 - localStrategy에서 done() --->  /login의 passport.authenticate의 콜백함수로 인자를 받음

5 - 사용자가 없으면 redirect, 있으면 req.login()실행. 인자로 user를 넘겨줌. serializeUser실행

6 - serializeUser실행 --> done(null, user.id) --> 세션에 user.id 저장

7 - 사용자가 확인 되었으니, /login에서 redirect('~');

8 - /success 요청

9 - app.js의 passport.session() 실행

10 - deserializeUser실행 -> 세션에서 유저아이디 가져옴(req.session.passport.user)

11 - 세션에서 가져온 정보를 이용해 db에서 사용자 조회. 있음 -> done(null ,user)

12 - req.user로 회원정보를 가져올 수 있음

https://kosaf04pyh.tistory.com/23

 */
const MongoStore = require("connect-mongo")(session);
app.use(
	session({
		secret: "@#@$MYSI$!$@!$!@",
		resave: false,
		saveUninitialized: false,
		cookie: { maxAge: 1000 * 60 * 60 * 24 * 14 }, // 쿠키 유효기간 14일
		store: new MongoStore({
			mongooseConnection: Snbot.Database.Mongoose.connection
		})
	})
);
//[Start] Passport
var passport = require("passport"),
	util = require("util"),
	TwitterStrategy = require("passport-twitter").Strategy,
	cookieParser = require("cookie-parser");

//console.log(config);

// Use the TwitterStrategy within Passport.
passport.use(
	new TwitterStrategy(
		{
			consumerKey: process.env.consumer_key,
			consumerSecret: process.env.consumer_secret,
			callbackURL: process.env.callback_url
		},
		function(token, tokenSecret, profile, done) {
			//아마도 이것들은 auth/callback 으로 들어오는 데이터인것같다.
			loggerBot.info("name : ", profile.username);

			profile.token = token;
			profile.tokenSecret = tokenSecret;
			loggerBot.info("token : ", token)
			loggerBot.info("tokenSecret : ", tokenSecret)
			//그리고 DB에서 찾아서 done 하면 다시 DB의 Session 데이터 안에 저장이 된다.

			done(null, profile);
		}
	)
);

app.use(passport.initialize());
app.use(passport.session());

// Passport session setup.
passport.serializeUser(function(user, done) {
	done(null, user);
});

passport.deserializeUser(function(obj, done) {
	//req.user 를 결정
	done(null, obj);
});

/**
 *
 * 로그인 인증 루트
 */
app.get(
	"/auth/twitter",
	(req, res, next) => {
		req.session.returnTo = req.query.url;
		loggerBot.info("Session : ", req.session); 
		next();
	},
	passport.authenticate("twitter")
);

/**
 *
 * 로그인 인증 콜백 루트
 */
app.get("/auth/twitter/callback", (req, res, next) => {
	loggerBot.info("Callback Session : ", req.session);
	passport.authenticate("twitter", {
		successRedirect: req.session.returnTo,
		failureRedirect: req.session.returnTo
	})(req, res, next);
});

/**
 *
 * 클라이언트에서 현재 로그인한 유저 정보 받아가는 루트
 */
app.get("/user", function(req, res) {
	res.send(req.user);
});

/**
 *
 * 로그아웃
 */
app.get("/logout", function(req, res) {
	req.session.destroy(() => {
		res.redirect("/");
	});
});

/**
 * ★
 * server router
 */
const serverRouter = require("./routes/route");
app.use("/1.0/data", serverRouter);

/**
 *
 * Receives challenge response check (CRC)
 *
 **/
const security = require("./security");
app.get("/twitter", async function(request, response) {
	var crc_token = request.query.crc_token;
	loggerBot.info("received crc token : ", crc_token);

	if (crc_token) {
		var hash = security.get_challenge_response(
			crc_token,
			process.env.consumer_secret
		);
		response.status(200);
		response.send({
			response_token: "sha256=" + hash
		});
	} else {
		response.status(400);
		response.send("Error: crc_token missing from request.");
	}
});

/**
 *
 * ★
 * twitter post 웹훅이벤트를 이 루트로 받도록 설정됨
 *
 */
app.post("/twitter", async function(req, res) {
	//@ts-ignore

	res.status(200).send("OK");
	loggerBot.info("test env : ", process.env.TEST);

	// 예정 : DDOS 방어하기...*
	/**
	 *
	 * 실제 라이브 서버 (process.env.TEST == 0) 인 경우에만 작동하는 코드
	 *
	 */
	if (process.env.TEST == 0) {
		// 테스트 서버(테스트용으로 트위터 웹훅 이벤트 받아보려는 서버)모드가 아닐 때
		// (즉, 실제 서버 웹훅으로 들어온 데이터일때)
		let raw = req.rawBody;
		//loggerBot.info('[app.js: post/twitter]  raw : ' + raw);
		let myHmac = security.get_challenge_response(
			raw,
			process.env.consumer_secret
		);
		//loggerBot.info('[app.js: post/twitter]  MY Hash : sha256=' + myHmac);
		let myHash = "sha256=" + myHmac;
		let twittersign = req.headers["x-twitter-webhooks-signature"];

		loggerBot.info("Hash Comparison: ", myHash === twittersign);

		if (!(myHash === twittersign)) {
			loggerBot.error("[server] WARNING Data posted came from not twitter");
			//return;
		} else {
			loggerBot.info("[server] Data from twitter");
		}

		/**
		 * 테섭을 향해 프록시
		 */
		if (process.env.ALPHA_SERVER_URL) {
			//테섭(테스트용으로 트위터 웹훅이벤트 받아보려는 서버) URL 설정이 되어있는 경우
			var headers = {
				"User-Agent": "Super Agent/0.0.1",
				"Content-Type": "application/json"
			};

			var options = {
				url: process.env.ALPHA_SERVER_URL + "/twitter",
				method: "POST",
				headers: headers,
				json: req.body
			};

			// Start the request
			request(options, function(error, response, body) {
				if (!error && response.statusCode == 200) {
					// Print out the response body
					loggerBot.info("Posted tweet data to Beta server or local(ngrok)");
				} else {
					loggerBot.info("Beta server down.", response.statusCode);
				}
			});
		} else {
			loggerBot.info("[server] no alpha server url.");
		}
	} else {
		loggerBot.info("[server] TEST env on : no proxy");
	}

	loggerBot.info("[server] twitter webhook event arrived.");
	Snbot.catchWebHookEvent(req.body).catch(err => {
		loggerBot.error({err:err, req: req.body});
	}).catch(err => {
		loggerBot.error({err:err, req: req.body});
	}).catch(err => {
		console.error(err);
	});
});

// Import and Set Nuxt.js options
const config = require("../nuxt.config.js");
config.dev = process.env.NODE_ENV !== "production";

async function start() {
	// Init Nuxt.js
	const nuxt = new Nuxt(config);

	const { host, port } = nuxt.options.server;

	// Build only in dev mode
	if (config.dev) {
    console.log('Nuxt Build start..')
		const builder = new Builder(nuxt);
		await builder.build();
	} else {
		await nuxt.ready();
	}

	// Give nuxt middleware to express
	app.use(nuxt.render);

	// Listen the server
	app.listen(port, host);
	consola.ready({
		message: `Server listening on http://${host}:${port}`,
		badge: true
	});
}
start();
