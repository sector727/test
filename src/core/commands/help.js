const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("List available commands"),

    async execute(interaction, client) {
        const commands = [...client.commands.values()]
            .map(cmd => `• **/${cmd.data.name}** — ${cmd.data.description}`)
            .join("\n");

        await interaction.reply({
            content: `Here are my available commands:\n\n${commands}`,
            ephemeral: true
        });
    }
};
