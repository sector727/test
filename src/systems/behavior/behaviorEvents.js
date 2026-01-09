function registerBehaviorEvents(client) {
    client.on("messageCreate", async message => {
        if (message.author.bot) return;

        const userID = message.author.id;

        // Spam detection
        if (client.behavior.spam.check(userID)) {
            const score = client.behavior.score.add(userID, 10, "Spam detected");

            client.logging.writer.write(
                "SMARTCONTROL",
                client.logging.formatter.smart(
                    "SPAM_DETECTED",
                    userID,
                    `Score increased to ${score}`
                )
            );
        }

        // Abuse detection
        if (client.behavior.abuse.check(message)) {
            const score = client.behavior.score.add(userID, 20, "Abusive language");

            client.logging.writer.write(
                "SMARTCONTROL",
                client.logging.formatter.smart(
                    "ABUSE_DETECTED",
                    userID,
                    `Score increased to ${score}`
                )
            );
        }
    });

    client.on("guildMemberAdd", member => {
        if (client.behavior.raid.check()) {
            client.logging.writer.write(
                "SMARTCONTROL",
                client.logging.formatter.smart(
                    "RAID_DETECTED",
                    member.id,
                    "Multiple joins detected"
                )
            );
        }
    });
}

module.exports = { registerBehaviorEvents };
