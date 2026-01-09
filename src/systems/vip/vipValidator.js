class VIPValidator {
    constructor(client) {
        this.client = client;
    }

    async validate(message) {
        const attachment = message.attachments.first();
        const userID = message.author.id;

        // 1. Must have media
        if (!attachment) {
            return { ok: false, reason: "NO_MEDIA" };
        }

        // 2. Must be image or video
        if (!this.client.vip.media.isAllowed(attachment)) {
            return { ok: false, reason: "INVALID_TYPE" };
        }

        // 3. Download buffer (basic approach)
        const buffer = await this._downloadAttachment(attachment);
        if (!buffer) {
            return { ok: false, reason: "UNKNOWN" };
        }

        // 4. Duplicate check
        if (await this.client.vip.duplicates.isDuplicate(buffer, userID)) {
            return { ok: false, reason: "DUPLICATE" };
        }

        // 5. Internet content check (placeholder)
        if (await this.client.vip.internet.isFromInternet(attachment)) {
            return { ok: false, reason: "INTERNET_CONTENT" };
        }

        // 6. AI detection (placeholder)
        if (await this.client.vip.ai.isAI(attachment)) {
            return { ok: false, reason: "AI_CONTENT" };
        }

        return { ok: true };
    }

    async _downloadAttachment(attachment) {
        try {
            const res = await fetch(attachment.url);
            return Buffer.from(await res.arrayBuffer());
        } catch {
            return null;
        }
    }
}

module.exports = { VIPValidator };
