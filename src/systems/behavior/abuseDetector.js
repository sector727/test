class AbuseDetector {
    constructor(client) {
        this.client = client;

        this.profanity = ["fuck", "shit", "bitch", "asshole"];
        this.threats = ["kill you", "hurt you", "beat you"];
        this.harassment = ["kys", "die", "worthless", "idiot"];
        this.sexual = ["nsfw", "nude", "onlyfans"];
    }

    check(message) {
        const content = message.content.toLowerCase();

        if (this.profanity.some(w => content.includes(w)))
            return "PROFANITY";

        if (this.threats.some(w => content.includes(w)))
            return "THREAT";

        if (this.harassment.some(w => content.includes(w)))
            return "HARASSMENT";

        if (this.sexual.some(w => content.includes(w)))
            return "SEXUAL_CONTENT";

        return null;
    }
}

module.exports = { AbuseDetector };
