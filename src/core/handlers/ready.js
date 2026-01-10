module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        console.log(`[READY] Logged in as ${client.user.tag}`);

        const HEALTH_CHANNEL_ID = client.config.channels.health; // adjust to your config

        const channel = client.channels.cache.get(HEALTH_CHANNEL_ID);
        if (!channel) {
            console.error("[HEALTH] Health channel not found");
            return;
        }

        // Generate initial health embed
        const initialEmbed = client.health.status.generateEmbed();

        // Send the initial message
        const msg = await channel.send({ embeds: [initialEmbed] });

        // Store the message ID so heartbeat can update it
        client.healthMessageId = msg.id;

        // Start heartbeat
        client.health.startHeartbeat(client);

        console.log("[HEALTH] Initial health message created");
    }
};
