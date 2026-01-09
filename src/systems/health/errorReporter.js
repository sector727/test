class ErrorReporter {
    constructor(client) {
        this.client = client;
    }

    async report(subsystem, message) {
        const errorChannel = await this.client.channels.fetch(
            this.client.config.channels.error_reports
        );

        const systemLogChannel = await this.client.channels.fetch(
            this.client.config.channels.system_logs
        );

        const embed = {
            title: `Error: ${subsystem}`,
            description: message,
            color: 0xff0000,
            timestamp: new Date()
        };

        if (errorChannel) errorChannel.send({ embeds: [embed] });
        if (systemLogChannel) systemLogChannel.send({ embeds: [embed] });

        // Update health status
        if (this.client.health?.status) {
            this.client.health.status.set(subsystem.toLowerCase(), "ERROR");
        }
    }
}

module.exports = { ErrorReporter };
