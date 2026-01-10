class BehaviorScore {
    constructor(client) {
        this.client = client;
        this.scores = new Map(); // userID -> score
        this.history = new Map(); // userID -> [{ amount, reason, timestamp }]
        this.maxScore = 120;
        this.decayRate = 1; // per minute
    }

    add(userID, amount, reason) {
        const current = this.scores.get(userID) || 0;
        const updated = Math.min(current + amount, this.maxScore);

        this.scores.set(userID, updated);

        if (!this.history.has(userID)) this.history.set(userID, []);
        this.history.get(userID).push({
            amount,
            reason,
            timestamp: Date.now()
        });

        this.client.logging.writer.write(
            "SYSTEM",
            this.client.logging.formatter.system(
                "BEHAVIOR_SCORE_UPDATE",
                `User <@${userID}> score changed by ${amount} (${reason}). New score: ${updated}`
            )
        );

        return updated;
    }

    get(userID) {
        return this.scores.get(userID) || 0;
    }

    decay() {
        for (const [userID, score] of this.scores.entries()) {
            const newScore = Math.max(0, score - this.decayRate);
            this.scores.set(userID, newScore);
        }
    }
}

module.exports = { BehaviorScore };
