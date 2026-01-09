class EscalationEngine {
    constructor(client) {
        this.client = client;
    }

    recommend(userID) {
        const score = this.client.behavior.score.get(userID);

        if (score >= 90) return "BAN";
        if (score >= 70) return "KICK";
        if (score >= 50) return "TIMEOUT_24H";
        if (score >= 30) return "TIMEOUT_1H";

        return "WARN";
    }

    explain(action) {
        const reasons = {
            WARN: "Low‑level issue. A warning is appropriate.",
            TIMEOUT_1H: "Medium‑level issue. Short timeout recommended.",
            TIMEOUT_24H: "High‑level issue. Long timeout recommended.",
            KICK: "Severe issue. Kick recommended.",
            BAN: "Extreme issue. Ban recommended."
        };

        return reasons[action] || "No explanation available.";
    }
}

module.exports = { EscalationEngine };
