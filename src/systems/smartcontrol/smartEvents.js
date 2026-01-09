function registerSmartEvents(client) {
    client.on("messageCreate", async message => {
        if (message.author.bot) return;

        const userID = message.author.id;

        // Cooldown check
        if (client.smart.cooldowns.isOnCooldown(userID)) {
            message.delete().catch(() => {});
            return;
        }

        // Pattern analysis
        const pattern = client.smart.patterns.analyze(message);
        if (pattern) {
            client.behavior.score.add(userID, 10, `Pattern detected: ${pattern}`);

            client.logging.writer.write(
                "SMARTCONTROL",
                client.logging.formatter.smart(
                    "PATTERN_DETECTED",
                    userID,
                    pattern
                )
            );

            client.smart.responder.send(message);
            client.smart.cooldowns.apply(userID);
            return;
        }

        // Behavior score warnings
        const score = client.behavior.score.get(userID);
        if (score >= 30) {
            client.smart.responder.send(message);
            client.smart.cooldowns.apply(userID);
        }
    });
}

module.exports = { registerSmartEvents };
