class AdaptiveResponder {
    constructor(client) {
        this.client = client;

        this.patternResponses = {
            LINK_SPAM: "Cool link. Post it again and I’m duct-taping your keyboard.",
            WALL_OF_TEXT: "I’m not reading all that. Break it up or don’t send it.",
            CHARACTER_SPAM: "If your keyboard is broken, blink twice.",
            EMOJI_SPAM: "That’s enough emojis to summon a demon. Tone it down.",
            KEYBOARD_SMASH: "If that was English, I’ll eat my own code.",
            REPEATED_MESSAGE: "Copy-pasting the same thing won’t make it smarter."
        };
    }

    scoreResponse(score) {
        if (score < 20)
            return "Relax, you're fine. Just don't get weird.";

        if (score < 40)
            return "You're starting to look spicy. Cool it.";

        if (score < 60)
            return "You're on thin ice, champ.";

        if (score < 80)
            return "You're one message away from staff noticing you exist.";

        return "You're basically begging for a timeout. Chill before someone obliges.";
    }

    async send(message, pattern = null) {
        const score = this.client.behavior.score.get(message.author.id);

        let response;

        if (pattern && this.patternResponses[pattern]) {
            response = this.patternResponses[pattern];
        } else {
            response = this.scoreResponse(score);
        }

        await message.reply(response).catch(() => {});
    }
}

module.exports = { AdaptiveResponder };
