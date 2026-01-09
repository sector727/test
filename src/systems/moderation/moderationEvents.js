function registerModerationEvents(client) {
    client.on("messageReactionAdd", async (reaction, user) => {
        if (user.bot) return;

        const message = reaction.message;

        // Only handle approval messages
        if (message.channel.id !== client.config.channels.approvals) return;

        const actionID = extractActionID(message);
        const payload = client.moderation.approvals.get(actionID);
        if (!payload) return;

        if (reaction.emoji.name === "✅") {
            client.moderation.router.route(payload.action, payload);
            client.moderation.approvals.remove(actionID);
        }

        if (reaction.emoji.name === "❌") {
            client.moderation.approvals.remove(actionID);
        }
    });

    client.on("interactionCreate", async interaction => {
        if (!interaction.isStringSelectMenu()) return;
        if (interaction.customId !== "punishment_select") return;

        const action = interaction.values[0];
        const userID = interaction.message.embeds[0].description.match(/<@(\d+)>/)[1];

        const payload = {
            user: userID,
            action,
            reason: "Staff-selected punishment"
        };

        client.moderation.approvals.requestApproval(
            `manual-${Date.now()}`,
            payload
        );

        await interaction.reply({ content: "Sent for approval.", ephemeral: true });
    });
}

function extractActionID(message) {
    const match = message.embeds[0]?.description?.match(/Action ID: \*\*(.+?)\*\*/);
    return match ? match[1] : null;
}

module.exports = { registerModerationEvents };
