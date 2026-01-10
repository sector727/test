class VIPValidator {
    constructor(client) {
        this.client = client;
    }

    async validate(message) {
        const attachment = message.attachments.first();
        const userID = message.author.id;

        if (!attachment) return { ok: false, reason: "NO_MEDIA" };

        if (!this.client.vip.media.isAllowed(attachment))
            return { ok: false, reason: "INVALID_TYPE" };

        const buffer = await this._download(attachment);
        if (!buffer) return { ok: false, reason: "UNKNOWN" };

        if (await this.client.vip.duplicates.isDuplicate(buffer, userID))
            return { ok: false, reason: "DUPLICATE" };

        if (await this.client.vip.internet.isFromInternet(attachment))
            return { ok: false, reason: "INTERNET_CONTENT" };

        if (await this.client.vip.ai.isAI(attachment))
            return { ok: false, reason: "AI_CONTENT" };

        return { ok: true };
    }

    async _download(attachment) {
        try {
            const res = await fetch(attachment.url);
            return Buffer.from(await res.arrayBuffer());
        } catch {
            return null;
        }
    }
}

module.exports = { VIPValidator };
