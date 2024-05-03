// Anti Crash System
process.on("unhandledRejection", (reason, promise) => {
    console.error(reason?.stack, promise);
  });
  process.on("uncaughtException", (err, origin) => {
    console.error(err?.stack, origin);
  });
  
  process.on("uncaughtExceptionMonitor", (err, origin) => {
    console.error(err?.stack, origin);
  });
  
