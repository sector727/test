class ApprovalQueue {
    constructor(client) {
        this.client = client;
        this.queue = new Map();
    }

    async requestApproval(actionID, payload) {
        this.queue.set(actionID, payload);

        const channel = await this.client.channels.fetch(
            this.client.config.channels.approvals
        );

        const embed = {
            title: "Moderation Approval Required",
            description: `Action ID: **${actionID}**\nUser: <@${payload.user}>`,
            color: 0xffa500,
            timestamp: new Date()
        };

        const msg = await channel.send({ embeds: [embed] });
        await msg.react("✅");
        await msg.react("❌");

        return actionID;
    }

    get(actionID) {
        return this.queue.get(actionID);
    }

    remove(actionID) {
        this.queue.delete(actionID);
    }
}

module.exports = { ApprovalQueue };
