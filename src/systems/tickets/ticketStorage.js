const fs = require("fs");
const path = require("path");

class TicketStorage {
    constructor() {
        this.file = path.join(__dirname, "../../data/storage/tickets.json");
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

    set(ticketID, payload) {
        this.data[ticketID] = payload;
        this._save();
    }

    get(ticketID) {
        return this.data[ticketID];
    }

    remove(ticketID) {
        delete this.data[ticketID];
        this._save();
    }
}

module.exports = { TicketStorage };
