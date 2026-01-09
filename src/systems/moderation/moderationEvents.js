function registerModerationEvents(client) {
    // Handle approval reactions
    client.on("messageReactionAdd", async (reaction, user) => {
        if (user.bot) return;

        const message = reaction.message;
        if (message.channel.id !== client.config.channels.approvals) return;

        const actionID = extractActionID(message);
        const entry = client.moderation.approvals.get(actionID);
        if (!entry) return;

        // Only staff can approve
        const member = await message.guild.members.fetch(user.id);
        if (!member.roles.cache.has(client.config.roles.staff)) return;

        if (reaction.emoji.name === "✅") {
            client.moderation.router.route(entry.action, entry.payload);
            client.moderation.approvals.remove(actionID);
        }

        if (reaction.emoji.name === "❌") {
            client.moderation.approvals.remove(actionID);
        }
    });

    // Handle punishment menu
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

        client.moderation.approvals.requestApproval(action, payload);

        await interaction.reply({ content: "Sent for approval.", ephemeral: true });
    });
}

function extractActionID(message) {
    const match = message.embeds[0]?.description?.match(/Action ID: (\w+)/);
    return match ? match[1] : null;
}

module.exports = { registerModerationEvents };
