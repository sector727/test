class LogWriter {
    constructor(client) {
        this.client = client;
    }

    async write(type, embed) {
        try {
            await this.client.logging.router.route(type, embed);
        } catch (err) {
            console.error(`[LOGGING] Write failed: ${type}`, err);
            this.client.health.errors.report("LOGGING", err.message);
        }
    }
}

module.exports = { LogWriter };
