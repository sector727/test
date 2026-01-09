function startHeartbeat(client) {
    setInterval(() => {
        client.health.status.update();
    }, 30000);

    console.log("[HEARTBEAT] Heartbeat started");
}

module.exports = { startHeartbeat };
