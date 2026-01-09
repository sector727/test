const fs = require("fs");
const path = require("path");

class TimerStorage {
    constructor() {
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

    set(userID, timestamp) {
        this.data[userID] = timestamp;
        this._save();
    }

    get(userID) {
        return this.data[userID] || 0;
    }

    remove(userID) {
        delete this.data[userID];
        this._save();
    }
}

module.exports = { TimerStorage };
