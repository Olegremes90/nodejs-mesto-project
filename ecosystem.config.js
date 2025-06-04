module.exports = {
  apps: [
    {
      name: 'mesto-app',
      script: './dist/app.js',   // Запускаем JS, а не TS
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
};
