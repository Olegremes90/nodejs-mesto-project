module.exports = {
  apps: [
    {
      name: "mesto-app",
      script: "./src/app.ts",
      interpreter: "ts-node",
      args: ["--loader", "ts-node/esm"],
    },
  ],
};
