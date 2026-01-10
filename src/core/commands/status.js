const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("status")
        .setDescription("Show system health status"),

    async execute(interaction, client) {
        const embed = client.health.status.generateEmbed();
        await interaction.reply({ embeds: [embed] });
    }
};
