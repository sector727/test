class CooldownManager {
    constructor(client) {
        this.client = client;
        this.cooldowns = new Map(); // userID -> timestamp
    }

    isOnCooldown(userID) {
        const now = Date.now();
        const until = this.cooldowns.get(userID) || 0;
        return now < until;
    }

    apply(userID) {
        const score = this.client.behavior.score.get(userID);

        // Base cooldown: 3 seconds
        let duration = 3000;

        // Increase cooldown based on behavior score
        if (score >= 30) duration = 5000;
        if (score >= 50) duration = 8000;
        if (score >= 70) duration = 12000;
        if (score >= 90) duration = 20000;

        this.cooldowns.set(userID, Date.now() + duration);
    }
}

module.exports = { CooldownManager };
