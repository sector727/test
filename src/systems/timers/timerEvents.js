function registerTimerEvents(client) {
    client.on("vip_submission_valid", userID => {
        client.timers.storage.set(userID, Date.now());
    });
}

module.exports = { registerTimerEvents };
