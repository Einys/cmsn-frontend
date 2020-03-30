module.exports = {
  apps : [
      {
        name: "app",
        script: "./server/index.js",
        watch: true,
        env: {
            "PORT": 8080,
            "HOST": "0.0.0.0",
            "NODE_ENV": "production",
            "DEBUG": "snbot:*, -snbot:equation.ts, -snbot:equation.js",
            "TWITTER_NOPOST": 0,
            "ALPHA_SERVER_URL": "http://f4ee688b.ngrok.io"
        },
	      log_date_format: 'YYYY-MM-DD HH:mm Z'
      }
  ]
}
