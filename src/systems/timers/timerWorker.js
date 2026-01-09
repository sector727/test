class TimerWorker {
    constructor(client) {
        this.client = client;
    }

    async run() {
        const now = Date.now();
        const timers = this.client.timers.storage.data;

        for (const userID of Object.keys(timers)) {
            const lastSubmission = timers[userID];

            // 24 hours = 86,400,000 ms
            const expiresAt = lastSubmission + 86400000;

            if (now >= expiresAt) {
                await this._expire(userID);
            }
        }
    }

    async _expire(userID) {
        const guild = this.client.guilds.cache.first();
        if (!guild) return;

        const member = await guild.members.fetch(userID).catch(() => null);
        if (!member) return;

        const roleID = this.client.config.roles.private_member;

        if (member.roles.cache.has(roleID)) {
            await member.roles.remove(roleID).catch(() => {});
        }

        this.client.timers.storage.remove(userID);

        this.client.logging.writer.write(
            "SYSTEM",
            this.client.logging.formatter.system(
                "VIP_EXPIRED",
                `User <@${userID}> lost VIP access due to expiration.`
            )
        );
    }
}

module.exports = { TimerWorker };
