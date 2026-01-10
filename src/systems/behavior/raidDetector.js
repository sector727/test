class RaidDetector {
    constructor(client) {
        this.client = client;
        this.joins = [];
        this.window = 10000; // 10 seconds
        this.limit = 5; // 5 joins in 10 seconds
    }

    check(member) {
        const now = Date.now();
        this.joins = this.joins.filter(t => now - t < this.window);
        this.joins.push(now);

        // Burst join raid
        if (this.joins.length >= this.limit) return "BURST_RAID";

        // Suspicious account age
        const created = member.user.createdTimestamp;
        if (Date.now() - created < 1000 * 60 * 60 * 24) return "NEW_ACCOUNT_RAID";

        return null;
    }
}

module.exports = { RaidDetector };
