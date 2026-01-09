class AdaptiveResponder {
    constructor(client) {
        this.client = client;
    }

    getResponse(score) {
        if (score < 20)
            return "Relax, champ. You're fine. For now.";

        if (score < 40)
            return "You're starting to look spicy. Cool it.";

        if (score < 60)
            return "You're on thin ice, my friend.";

        if (score < 80)
            return "You're one message away from a staff member breathing down your neck.";

        return "You're basically begging for a timeout. Chill.";
    }

    async send(message) {
        const score = this.client.behavior.score.get(message.author.id);
        const response = this.getResponse(score);

        await message.reply(response).catch(() => {});
    }
}

module.exports = { AdaptiveResponder };
