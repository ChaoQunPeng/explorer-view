module.exports = {
  apps: [
    {
      name: 'explorer-view',
      script: './www.js',
      // env: {
      //   PORT: 3030,
      //   NODE_ENV: 'development'
      // },
      env: {
        PORT: 3031,
        NODE_ENV: "production"
      }
    }
  ]
};
