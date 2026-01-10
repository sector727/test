function hasPermission(interaction, command, client) {
    // Owner-only commands
    if (command.ownerOnly) {
        if (interaction.user.id !== client.config.ownerId) {
            return {
                allowed: false,
                reason: "This command is restricted to the bot owner."
            };
        }
    }

    // Role-restricted commands
    if (command.requiredRoles?.length) {
        const memberRoles = interaction.member.roles.cache;
        const hasRole = command.requiredRoles.some(roleId => memberRoles.has(roleId));

        if (!hasRole) {
            return {
                allowed: false,
                reason: "You do not have the required role to use this command."
            };
        }
    }

    // Permission-restricted commands
    if (command.requiredPermissions?.length) {
        const hasPerms = interaction.member.permissions.has(command.requiredPermissions);

        if (!hasPerms) {
            return {
                allowed: false,
                reason: "You do not have the required permissions to use this command."
            };
        }
    }

    return { allowed: true };
}

module.exports = { hasPermission };
