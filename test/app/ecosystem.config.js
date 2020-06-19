const path = require('path');

module.exports = {
  apps: [
    {
      name: 'test-app',
      script: path.join(__dirname, 'index.js'),
      instances: 0,
      exec_mode: 'cluster',
      source_map_support: true,
      autorestart: true,
      max_restarts: 1,
      restart_delay: 5000,
      v8: true,
      log_date_format: 'YYYY-MM-DDTHH:mm:ss.sssZ',
      max_memory_restart: process.env.PM2_MAX_MEMORY_RESTART || '32G',
    },
  ],
};
