const { hasPermission } = require("../validators/permissions");

module.exports = {
    name: "interactionCreate",
    async execute(interaction, client) {
        if (!interaction.isChatInputCommand()) return;

        const command = client.commands.get(interaction.commandName);
        if (!command) return;

        const perm = hasPermission(interaction, command, client);

        if (!perm.allowed) {
            return interaction.reply({
                content: perm.reason,
                ephemeral: true
            });
        }

        try {
            await command.execute(interaction, client);
        } catch (err) {
            console.error(err);

            await interaction.reply({
                content: "Something went wrong executing that command.",
                ephemeral: true
            });
        }
    }
};
