class SpamDetector {
    constructor(client) {
        this.client = client;
        this.cache = new Map(); // userID -> timestamps[]
        this.window = 5000; // 5 seconds
        this.limit = 5; // 5 messages in 5 seconds
    }

    check(userID) {
        const now = Date.now();
        const timestamps = this.cache.get(userID) || [];

        const filtered = timestamps.filter(t => now - t < this.window);
        filtered.push(now);

        this.cache.set(userID, filtered);

        return filtered.length >= this.limit;
    }
}

module.exports = { SpamDetector };
