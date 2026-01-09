class VIPTimer {
    constructor(client) {
        this.client = client;
    }

    reset(userID) {
        this.client.timers.storage.set(userID, Date.now());
    }

    get(userID) {
        return this.client.timers.storage.get(userID);
    }
}

module.exports = { VIPTimer };
