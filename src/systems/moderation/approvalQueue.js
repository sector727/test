const crypto = require("crypto");

class ApprovalQueue {
    constructor(client) {
        this.client = client;
        this.queue = new Map();
        this.expireAfter = 5 * 60 * 1000; // 5 minutes
    }

    createActionID() {
        return crypto.randomBytes(8).toString("hex");
    }

    async requestApproval(action, payload) {
        const actionID = this.createActionID();

        this.queue.set(actionID, {
            action,
            payload,
            created: Date.now(),
            status: "PENDING"
        });

        const channel = await this.client.channels.fetch(
            this.client.config.channels.approvals
        );

        const embed = {
            title: "Moderation Approval Required",
            description: [
                `**Action ID:** ${actionID}`,
                `**User:** <@${payload.user}>`,
                `**Action:** ${action}`,
                `**Reason:** ${payload.reason || "None provided"}`
            ].join("\n"),
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

    isExpired(entry) {
        return Date.now() - entry.created > this.expireAfter;
    }

    expireOld() {
        for (const [id, entry] of this.queue.entries()) {
            if (this.isExpired(entry)) {
                this.queue.delete(id);

                this.client.logging.writer.write(
                    "MODERATION",
                    this.client.logging.formatter.moderation(
                        "APPROVAL_EXPIRED",
                        entry.payload.user,
                        "SYSTEM",
                        "Approval request expired"
                    )
                );
            }
        }
    }
}

module.exports = { ApprovalQueue };
