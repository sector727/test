const path = require("path");

class MediaTypeChecker {
    constructor(client) {
        this.client = client;

        this.allowedMime = [
            "image/jpeg",
            "image/png",
            "image/webp",
            "video/mp4",
            "video/quicktime",
            "video/webm"
        ];

        this.allowedExtensions = [
            ".jpg", ".jpeg", ".png", ".webp",
            ".mp4", ".mov", ".webm"
        ];
    }

    isAllowed(attachment) {
        const mime = attachment.contentType || "";
        const ext = path.extname(attachment.url).toLowerCase();

        // MIME must be allowed
        if (!this.allowedMime.includes(mime)) return false;

        // Extension must be allowed
        if (!this.allowedExtensions.includes(ext)) return false;

        // Reject Discord "unknown" MIME types
        if (mime === "application/octet-stream") return false;

        return true;
    }
}

module.exports = { MediaTypeChecker };
