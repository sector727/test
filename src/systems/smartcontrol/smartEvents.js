function registerSmartEvents(client) {
    client.on("messageCreate", async message => {
        if (message.author.bot) return;

        const userID = message.author.id;

        // 1. Cooldown check
        if (client.smart.cooldowns.isOnCooldown(userID)) {
            message.delete().catch(() => {});
            return;
        }

        // 2. Pattern detection
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

            await client.smart.responder.send(message, pattern);
            client.smart.cooldowns.apply(userID, pattern);
            return;
        }

        // 3. Behavior score warnings
        const score = client.behavior.score.get(userID);
        if (score >= 30) {
            await client.smart.responder.send(message);
            client.smart.cooldowns.apply(userID, "behavior_score");
        }
    });
}

module.exports = { registerSmartEvents };
