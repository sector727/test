const { initTimerEngine } = require("./timerEngine");

module.exports = {
    initTimerSystem(client) {
        initTimerEngine(client);
        console.log("[TIMERS] Timer system initialized");
    }
};
