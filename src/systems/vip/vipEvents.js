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

        // Valid submission
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
    // 🔥 Slightly nastier profanity-safe pack
    const responses = {
        NO_MEDIA:
            "You posted **nothing** to a media-only channel. I can’t even be mad, I’m just disappointed. Photo or video. Now.",
        INVALID_TYPE:
            "This isn’t a shitpost channel. No text walls, no stickers, no GIF spam. **Photo or video**, or get out.",
        DUPLICATE:
            "Recycling old content like nobody would notice? I notice everything. **New content**, not reruns.",
        INTERNET_CONTENT:
            "That’s clearly off the internet. Stock, stolen, or saved — doesn’t matter. **Your content or no VIP.**",
        AI_CONTENT:
            "AI again. You really tried to outsource your existence. **Real human content only**, not neural net fanfic.",
        UNKNOWN:
            "Whatever you uploaded confused even me. Delete it from your camera roll and try something that actually makes sense."
    };

    const msg = responses[reason] || responses.UNKNOWN;

    // Delete the invalid message
    await message.delete().catch(() => {});

    // DM the user the nasty-but-safe response
    await message.author.send(msg).catch(() => {});

    // Log the rejection
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
