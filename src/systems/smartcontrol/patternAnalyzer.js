class PatternAnalyzer {
    constructor(client) {
        this.client = client;
    }

    analyze(message) {
        const content = message.content.toLowerCase();

        if (content.includes("http://") || content.includes("https://"))
            return "LINK_SPAM";

        if (content.length > 500)
            return "WALL_OF_TEXT";

        if (/([a-zA-Z])\1{5,}/.test(content))
            return "CHARACTER_SPAM";

        return null;
    }
}

module.exports = { PatternAnalyzer };
