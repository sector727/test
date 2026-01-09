class MediaTypeChecker {
    constructor(client) {
        this.client = client;

        this.allowedExtensions = [
            ".jpg", ".jpeg", ".png", ".webp",
            ".mp4", ".mov", ".webm"
        ];
    }

    isAllowed(attachment) {
        const type = attachment.contentType || "";
        if (type.startsWith("image/") || type.startsWith("video/")) return true;

        const url = attachment.url.toLowerCase();
        return this.allowedExtensions.some(ext => url.endsWith(ext));
    }
}

module.exports = { MediaTypeChecker };
