const { initLoggingEngine } = require("./loggingEngine");

module.exports = {
    initLoggingSystem(client) {
        initLoggingEngine(client);
        console.log("[LOGGING] Logging system initialized");
    }
};
