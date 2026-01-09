function registerTicketEvents(client) {
    client.on("interactionCreate", async interaction => {
        if (!interaction.isButton()) return;
        if (interaction.customId !== "create_ticket") return;

        const userID = interaction.user.id;

        const channelID = await client.tickets.creator.create(userID);

        client.tickets.storage.set(channelID, {
            user: userID,
            created: Date.now()
        });

        client.tickets.logger.log("CREATED", userID, channelID);

        await interaction.reply({
            content: "Your ticket has been created.",
            ephemeral: true
        });
    });
}

module.exports = { registerTicketEvents };
