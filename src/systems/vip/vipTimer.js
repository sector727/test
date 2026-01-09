const fs = require("fs");
const path = require("path");

class VIPTimer {
    constructor(client) {
        this.client = client;
        this.file = path.join(__dirname, "../../data/storage/timers.json");
        this.data = this._load();
    }

    _load() {
        try {
            return JSON.parse(fs.readFileSync(this.file, "utf8"));
        } catch {
            return {};
        }
    }

    _save() {
        fs.writeFileSync(this.file, JSON.stringify(this.data, null, 2));
    }

    reset(userID) {
        this.data[userID] = Date.now();
        this._save();
    }

    get(userID) {
        return this.data[userID] || 0;
    }
}

module.exports = { VIPTimer };
