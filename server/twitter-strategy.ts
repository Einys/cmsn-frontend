import { Strategy } from 'passport-twitter'
import Snbot from './mymodule'
const TwitterStrategy = Strategy

export default new TwitterStrategy({
  consumerKey: process.env.consumer_key,
  consumerSecret: process.env.consumer_secret,
  callbackURL: process.env.callback_url
},
  function (token, tokenSecret, profile, done) {

    //아마도 이것들은 auth/callback 으로 들어오는 데이터인것같다.
    console.log('user : ', {...profile})

    Snbot.Database.User.updateOne({id: profile.id}, {}, {upsert: true}).catch(err => {console.error(err)}).then(user => {
      profile.token = token;
      profile.tokenSecret = tokenSecret;
      //그리고 DB에서 찾아서 done 하면 다시 DB의 Session 데이터 안에 저장이 된다.
      profile.appdata = user

      done(null, profile)
    })
  }
)
