module.exports = {
  apps: [
    {
      name: 'mesto-app',
      script: 'src/app.ts',
      interpreter: 'ts-node',
      watch: true,
      autorestart: true,
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
