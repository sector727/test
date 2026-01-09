class MediaTypeChecker {
    constructor(client) {
        this.client = client;
    }

    isAllowed(attachment) {
        const allowed = ["image/", "video/"];
        return allowed.some(type => attachment.contentType?.startsWith(type));
    }
}

module.exports = { MediaTypeChecker };
