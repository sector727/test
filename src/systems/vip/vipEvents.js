function registerVIPEevents(client) {
    client.on("messageCreate", async message => {
        if (message.author.bot) return;

        const vipChannels = Object.values(client.config.vip_access_channels);
        if (!vipChannels.includes(message.channel.id)) return;

        const result = await client.vip.validator.validate(message);

        if (!result.ok) {
            await handleInvalid(message, result.reason, client);
            return;
        }

        // Valid submission → reset VIP timer
        client.vip.timer.reset(message.author.id);
        client.emit("vip_submission_valid", message.author.id);

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

async function handleInvalid(message, reason, client) {
    const responses = {
        NO_MEDIA: "No. You can't renew with air. Attach a **photo or video**.",
        INVALID_TYPE: "Only **photos or videos**. No text, no GIFs, no stickers, no memes.",
        DUPLICATE: "Nice try. You've already used that one. New content only.",
        INTERNET_CONTENT: "If the internet has seen it, I don't want it. Use **your own** photos/videos.",
        AI_CONTENT: "AI doesn't count as a life experience. Real photos, real videos, or nothing.",
        UNKNOWN: "Something about that was off. Try again with a valid photo or video."
    };

    const msg = responses[reason] || responses.UNKNOWN;

    await message.delete().catch(() => {});
    await message.author.send(msg).catch(() => {});

    client.logging.writer.write(
        "PHOTOS",
        client.logging.formatter.photo(
            "VIP_REJECTED",
            message.author.id,
            `Reason: ${reason}`
        )
    );
}

module.exports = { registerVIPEevents };
