module.exports = {
    name: "ping",
    description: "Basic ping command",
    async execute(interaction) {
        await interaction.reply("Pong.");
    }
};
