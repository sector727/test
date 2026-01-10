const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("List available commands"),

    async execute(interaction, client) {
        const categories = {};

        for (const cmd of client.commands.values()) {
            if (!categories[cmd.category]) categories[cmd.category] = [];
            categories[cmd.category].push(cmd);
        }

        let output = "";

        for (const [category, cmds] of Object.entries(categories)) {
            output += `**${category.toUpperCase()}**\n`;
            for (const cmd of cmds) {
                output += `• **/${cmd.data.name}** — ${cmd.data.description}\n`;
            }
            output += "\n";
        }

        await interaction.reply({
            content: output,
            ephemeral: true
        });
    }
};
