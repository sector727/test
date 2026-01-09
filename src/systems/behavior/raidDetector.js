class RaidDetector {
    constructor(client) {
        this.client = client;
        this.joins = [];
        this.window = 10000; // 10 seconds
        this.limit = 5; // 5 joins in 10 seconds
    }

    check() {
        const now = Date.now();
        this.joins = this.joins.filter(t => now - t < this.window);
        this.joins.push(now);

        return this.joins.length >= this.limit;
    }
}

module.exports = { RaidDetector };
