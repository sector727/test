class BehaviorScore {
    constructor(client) {
        this.client = client;
        this.scores = new Map();
    }

    add(userID, amount, reason) {
        const current = this.scores.get(userID) || 0;
        const updated = current + amount;

        this.scores.set(userID, updated);

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
}

module.exports = { BehaviorScore };
