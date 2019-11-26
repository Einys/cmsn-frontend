module.exports = {
  apps : [
      {
        name: "app",
        script: "./server/index.js",
        watch: true,
        env: {
            "PORT": 8080,
            "HOST": "0.0.0.0",
            "NODE_ENV": "production"
        }
      }
  ]
}
