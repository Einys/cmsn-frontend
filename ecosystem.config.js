module.exports = {
  apps: [
    {
      name: "app",
      script: "./server/index.js",
      watch: true,
      env: {
        "PORT": 8080,
        "NODE_ENV": "development",
        "DEBUG": "snbot:*, -snbot:equation.ts, -snbot:equation.js",
      },
      env_production: {
        "PORT": 8080,
        "HOST": "0.0.0.0",
        "NODE_ENV": "production",
        "TWITTER_NOPOST": 0,
        "TEST": 0,
        "DEBUG": "snbot:*, -snbot:equation.ts, -snbot:equation.js",
        "ALPHA_SERVER_URL": "http://8bf62f10.ngrok.io"
      },
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
    }
  ]
}
