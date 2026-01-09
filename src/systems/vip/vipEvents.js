function registerVIPEevents(client) {
    client.on("messageCreate", async message => {
        if (message.author.bot) return;

        const vipChannels = Object.values(client.config.vip_access_channels);
        if (!vipChannels.includes(message.channel.id)) return;

        const result = await client.vip.validator.validate(message);

        if (!result.ok) {
            message.delete().catch(() => {});
            return;
        }

        client.vip.timer.reset(message.author.id);

        client.logging.writer.write(
            "PHOTOS",
            client.logging.formatter.photo(
                "VIP_SUBMISSION",
                message.author.id,
                "Valid submission"
            )
        );
    });
}

module.exports = { registerVIPEevents };
