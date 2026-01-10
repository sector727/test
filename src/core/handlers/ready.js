module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        console.log(`[READY] Logged in as ${client.user.tag}`);

        // Start heartbeat AFTER health engine is initialized
        client.health.startHeartbeat(client);

        // Force first update so the message is created
        await client.health.status.update();

        console.log("[HEALTH] Initial health message created");
    }
};
