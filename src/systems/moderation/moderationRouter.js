class ModerationRouter {
    constructor(client) {
        this.client = client;
    }

    async route(action, payload) {
        const { user, reason } = payload;

        switch (action) {
            case "WARN":
                return this.warn(user, reason);
            case "TIMEOUT_1H":
                return this.timeout(user, reason, 60 * 60 * 1000);
            case "TIMEOUT_24H":
                return this.timeout(user, reason, 24 * 60 * 60 * 1000);
            case "KICK":
                return this.kick(user, reason);
            case "BAN":
                return this.ban(user, reason);
        }
    }

    async warn(userID, reason) {
        const member = await this._fetchMember(userID);
        if (!member) return;

        await member.send(`You've been warned: ${reason}`).catch(() => {});

        this._log("WARN", userID, reason);
    }

    async timeout(userID, reason, duration) {
        const member = await this._fetchMember(userID);
        if (!member) return;

        await member.timeout(duration, reason).catch(() => {});

        this._log("TIMEOUT", userID, reason);
    }

    async kick(userID, reason) {
        const member = await this._fetchMember(userID);
        if (!member) return;

        await member.kick(reason).catch(() => {});

        this._log("KICK", userID, reason);
    }

    async ban(userID, reason) {
        const member = await this._fetchMember(userID);
        if (!member) return;

        await member.ban({ reason }).catch(() => {});

        this._log("BAN", userID, reason);
    }

    async _fetchMember(id) {
        try {
            return await this.client.guilds.cache.first().members.fetch(id);
        } catch {
            return null;
        }
    }

    _log(action, userID, reason) {
        this.client.logging.writer.write(
            "MODERATION",
            this.client.logging.formatter.moderation(
                action,
                userID,
                "STAFF",
                reason
            )
        );
    }
}

module.exports = { ModerationRouter };
