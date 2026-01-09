class TimerScheduler {
    constructor(client) {
        this.client = client;
        this.interval = 60 * 1000; // 1 minute
    }

    start() {
        setInterval(() => {
            this.client.timers.worker.run();
        }, this.interval);

        console.log("[TIMERS] Scheduler started");
    }
}

module.exports = { TimerScheduler };
