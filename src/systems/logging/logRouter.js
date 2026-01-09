class LogRouter {
    constructor(client) {
        this.client = client;

        this.map = {
            MODERATION: client.config.channels.moderation_logs,
            TICKETS: client.config.channels.ticket_logs,
            PHOTOS: client.config.channels.photo_logs,
            SMARTCONTROL: client.config.channels.smartcontrol_logs,
            AUDIT: client.config.channels.audit_log,
            SYSTEM: client.config.channels.system_logs
        };
    }

    async route(type, embed) {
        const channelID = this.map[type];
        if (!channelID) return;

        try {
            const channel = await this.client.channels.fetch(channelID);
            if (channel) channel.send({ embeds: [embed] });
        } catch (err) {
            console.error(`[LOGGING] Failed to route log: ${type}`, err);
            this.client.health.errors.report("LOGGING", err.message);
        }
    }
}

module.exports = { LogRouter };
