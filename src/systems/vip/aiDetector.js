class AIDetector {
    constructor(client) {
        this.client = client;
    }

    async isAI(attachment) {
        const url = attachment.url.toLowerCase();

        // Common AI filename patterns
        const aiPatterns = ["midjourney", "stable", "sdxl", "ai_", "_ai"];

        if (aiPatterns.some(p => url.includes(p))) return true;

        return false;
    }
}

module.exports = { AIDetector };
