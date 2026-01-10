const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

class DuplicateDetector {
    constructor(client) {
        this.client = client;
        this.file = path.join(__dirname, "../../data/storage/photo_hashes.json");
        this.hashes = this._load();
    }

    _load() {
        try {
            return JSON.parse(fs.readFileSync(this.file, "utf8"));
        } catch {
            return {};
        }
    }

    _save() {
        fs.writeFileSync(this.file, JSON.stringify(this.hashes, null, 2));
    }

    sha256(buffer) {
        return crypto.createHash("sha256").update(buffer).digest("hex");
    }

    async isDuplicate(buffer, userID) {
        const hash = this.sha256(buffer);

        if (!this.hashes[userID]) this.hashes[userID] = [];

        const exists = this.hashes[userID].includes(hash);

        if (!exists) {
            this.hashes[userID].push(hash);
            this._save();
        }

        return exists;
    }
}

module.exports = { DuplicateDetector };
