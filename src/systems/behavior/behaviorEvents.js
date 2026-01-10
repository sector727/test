function registerBehaviorEvents(client) {
    client.on("messageCreate", async message => {
        if (message.author.bot) return;

        const userID = message.author.id;
        const content = message.content;

        // 1. Spam detection
        const spamType = client.behavior.spam.check(userID, content);
        if (spamType) {
            client.behavior.score.add(userID, 10, spamType);

            client.logging.writer.write(
                "SMARTCONTROL",
                client.logging.formatter.smart(
                    "SPAM_DETECTED",
                    userID,
                    spamType
                )
            );
        }

        // 2. Abuse detection
        const abuseType = client.behavior.abuse.check(message);
        if (abuseType) {
            client.behavior.score.add(userID, 20, abuseType);

            client.logging.writer.write(
                "SMARTCONTROL",
                client.logging.formatter.smart(
                    "ABUSE_DETECTED",
                    userID,
                    abuseType
                )
            );
        }
    });

    client.on("guildMemberAdd", member => {
        const raidType = client.behavior.raid.check(member);
        if (raidType) {
            client.logging.writer.write(
                "SMARTCONTROL",
                client.logging.formatter.smart(
                    "RAID_DETECTED",
                    member.id,
                    raidType
                )
            );
        }
    });

    // Score decay every minute
    setInterval(() => {
        client.behavior.score.decay();
    }, 60000);
}

module.exports = { registerBehaviorEvents };
