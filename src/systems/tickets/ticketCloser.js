class TicketCloser {
    constructor(client) {
        this.client = client;
    }

    async close(channelID, reason = "No reason provided") {
        const channel = await this.client.channels.fetch(channelID);
        if (!channel) return;

        await channel.send({
            embeds: [
                {
                    title: "Ticket Closed",
                    description: `Reason: ${reason}`,
                    color: 0xff0000,
                    timestamp: new Date()
                }
            ]
        });

        setTimeout(() => channel.delete().catch(() => {}), 3000);
    }
}

module.exports = { TicketCloser };
