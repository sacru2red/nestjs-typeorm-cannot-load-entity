module.exports = {
  apps: [
    {
      name: 'bodumcare-api-v2',
      script: './dist/src/main.js',
      env: {
        NODE_ENV: 'dev',
      },
      env_production: {
        NODE_ENV: 'prod',
      },
    },
  ],
};
