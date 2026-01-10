class SpamDetector {
    constructor(client) {
        this.client = client;
        this.cache = new Map(); // userID -> timestamps[]
        this.window = 5000; // 5 seconds
        this.limit = 5; // 5 messages in 5 seconds
    }

    check(userID, content) {
        const now = Date.now();
        const timestamps = this.cache.get(userID) || [];

        const filtered = timestamps.filter(t => now - t < this.window);
        filtered.push(now);

        this.cache.set(userID, filtered);

        // Burst spam
        if (filtered.length >= this.limit) return "BURST_SPAM";

        // Ping spam
        if (content.includes("@")) return "PING_SPAM";

        // Emoji spam
        const emojiCount = [...content].filter(c => /\p{Emoji}/u.test(c)).length;
        if (emojiCount > 10) return "EMOJI_SPAM";

        // Copy/paste spam
        if (content.length > 0 && filtered.length >= 3) {
            const lastThree = filtered.slice(-3);
            if (lastThree.length === 3) return "REPEATED_SPAM";
        }

        return null;
    }
}

module.exports = { SpamDetector };
