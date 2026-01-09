class EscalationEngine {
    constructor(client) {
        this.client = client;
    }

    recommend(score) {
        if (score >= 90) return "BAN";
        if (score >= 70) return "KICK";
        if (score >= 50) return "TIMEOUT_24H";
        if (score >= 30) return "TIMEOUT_1H";
        return "WARN";
    }
}

module.exports = { EscalationEngine };
