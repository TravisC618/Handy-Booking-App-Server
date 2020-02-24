module.exports = {
  apps: [
    {
      name: "handy-booking-server",
      script: "./src/index.js",
      env_production: {
        NODE_ENV: "production",
        PORT: 4000
      }
    }
  ]
};
