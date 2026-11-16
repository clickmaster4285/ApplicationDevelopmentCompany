// PM2 process definition for production (used by scripts/deploy.sh).
//
// Cluster mode with 2+ instances lets `pm2 reload` restart workers one at a
// time, so nginx always has a live upstream during deploys (no 502 window).
// `cwd` points at the `current` symlink: each reloaded worker starts inside
// the newly activated release, while workers still draining keep the old one.
//
// Env overrides: APP_ROOT, PM2_APP_NAME, PORT, PM2_INSTANCES.
const path = require("node:path");

const appRoot = process.env.APP_ROOT || "/var/www/clickmasters-app";
const cwd = path.join(appRoot, "current");

module.exports = {
  apps: [
    {
      name: process.env.PM2_APP_NAME || "clickmasters-app",
      cwd,
      script: "node_modules/next/dist/bin/next",
      args: "start",
      exec_mode: "cluster",
      instances: Number(process.env.PM2_INSTANCES || 2),
      // Wait for the worker to accept connections before stopping the next one.
      wait_ready: false,
      listen_timeout: 30000,
      kill_timeout: 10000,
      max_memory_restart: process.env.PM2_MAX_MEMORY || "1G",
      env: {
        NODE_ENV: "production",
        PORT: process.env.PORT || "3000",
      },
    },
  ],
};
