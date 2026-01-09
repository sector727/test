class TicketCreator {
    constructor(client) {
        this.client = client;
    }

    async create(userID) {
        const guild = this.client.guilds.cache.first();
        const categoryID = this.client.config.categories.TICKETS;

        const channel = await guild.channels.create({
            name: `ticket-${userID}`,
            type: 0,
            parent: categoryID,
            permissionOverwrites: [
                {
                    id: guild.roles.everyone.id,
                    deny: ["ViewChannel"]
                },
                {
                    id: userID,
                    allow: ["ViewChannel", "SendMessages"]
                },
                {
                    id: this.client.config.roles.staff,
                    allow: ["ViewChannel", "SendMessages"]
                }
            ]
        });

        const embed = {
            title: "Ticket Created",
            description: "A staff member will be with you shortly.",
            color: 0x5865f2,
            timestamp: new Date()
        };

        await channel.send({ embeds: [embed] });

        return channel.id;
    }
}

module.exports = { TicketCreator };
