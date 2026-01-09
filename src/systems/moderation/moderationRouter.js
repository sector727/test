class ModerationRouter {
    constructor(client) {
        this.client = client;
    }

    async route(action, payload) {
        switch (action) {
            case "WARN":
                return this.warn(payload);
            case "TIMEOUT_1H":
                return this.timeout(payload, 60 * 60 * 1000);
            case "TIMEOUT_24H":
                return this.timeout(payload, 24 * 60 * 60 * 1000);
            case "KICK":
                return this.kick(payload);
            case "BAN":
                return this.ban(payload);
        }
    }

    async warn({ user, reason }) {
        const member = await this._fetchMember(user);
        if (!member) return;

        await member.send(`You have been warned: ${reason}`);
    }

    async timeout({ user, reason, duration }) {
        const member = await this._fetchMember(user);
        if (!member) return;

        await member.timeout(duration, reason);
    }

    async kick({ user, reason }) {
        const member = await this._fetchMember(user);
        if (!member) return;

        await member.kick(reason);
    }

    async ban({ user, reason }) {
        const member = await this._fetchMember(user);
        if (!member) return;

        await member.ban({ reason });
    }

    async _fetchMember(id) {
        try {
            return await this.client.guilds.cache
                .first()
                .members.fetch(id);
        } catch {
            return null;
        }
    }
}

module.exports = { ModerationRouter };
