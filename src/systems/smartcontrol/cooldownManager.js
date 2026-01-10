class CooldownManager {
    constructor(client) {
        this.client = client;
        this.cooldowns = new Map(); // userID -> { until, reason }
    }

    isOnCooldown(userID) {
        const entry = this.cooldowns.get(userID);
        if (!entry) return false;

        return Date.now() < entry.until;
    }

    apply(userID, reason = "general") {
        const score = this.client.behavior.score.get(userID);

        // Base cooldown: 2 seconds
        let duration = 2000;

        // Behavior-based scaling
        if (score >= 20) duration = 4000;
        if (score >= 40) duration = 7000;
        if (score >= 60) duration = 12000;
        if (score >= 80) duration = 20000;

        this.cooldowns.set(userID, {
            until: Date.now() + duration,
            reason
        });

        this.client.logging.writer.write(
            "SMARTCONTROL",
            this.client.logging.formatter.smart(
                "COOLDOWN_APPLIED",
                userID,
                `Cooldown applied for ${duration}ms (${reason})`
            )
        );
    }
}

module.exports = { CooldownManager };
