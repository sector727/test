class InternetDetector {
    constructor(client) {
        this.client = client;
    }

    async isFromInternet(attachment) {
        const url = attachment.url.toLowerCase();

        // If Discord CDN URL contains "external"
        if (url.includes("external")) return true;

        // If filename contains stock photo patterns
        const suspicious = ["stock", "pexels", "unsplash", "getty"];
        if (suspicious.some(s => url.includes(s))) return true;

        return false;
    }
}

module.exports = { InternetDetector };
