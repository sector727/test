class StatusManager {
    constructor(client) {
        this.client = client;

        this.subsystems = {
            health: "OK",
            logging: "OK",
            moderation: "OK",
            tickets: "OK",
            vip: "OK",
            timers: "OK",
            behavior: "OK",
            smartcontrol: "OK"
        };
    }

    set(subsystem, status) {
        this.subsystems[subsystem] = status;
        this.update();
    }

    async update() {
        const channel = await this.client.channels.fetch(
            this.client.config.channels.bot_health
        );

        if (!channel) return;

        const embed = {
            title: "System Health Status",
            color: this._color(),
            fields: Object.entries(this.subsystems).map(([name, status]) => ({
                name: name.toUpperCase(),
                value: status,
                inline: true
            })),
            timestamp: new Date()
        };

        channel.send({ embeds: [embed] });
    }

    _color() {
        if (Object.values(this.subsystems).includes("CRITICAL")) return 0xff0000;
        if (Object.values(this.subsystems).includes("WARN")) return 0xffa500;
        return 0x00ff00;
    }
}

module.exports = { StatusManager };
