const { TimerScheduler } = require("./timerScheduler");
const { TimerWorker } = require("./timerWorker");
const { TimerStorage } = require("./timerStorage");
const { registerTimerEvents } = require("./timerEvents");

function initTimerEngine(client) {
    client.timers = {
        scheduler: new TimerScheduler(client),
        worker: new TimerWorker(client),
        storage: new TimerStorage()
    };

    client.timers.scheduler.start();
    registerTimerEvents(client);
}

module.exports = { initTimerEngine };
