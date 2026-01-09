class PunishmentMenu {
    constructor(client) {
        this.client = client;
    }

    async sendMenu(channelID, userID, recommended) {
        const channel = await this.client.channels.fetch(channelID);

        const embed = {
            title: "Select Punishment",
            description: `User: <@${userID}>\nRecommended: **${recommended}**`,
            color: 0x5865f2,
            timestamp: new Date()
        };

        const components = [
            {
                type: 1,
                components: [
                    {
                        type: 3,
                        custom_id: "punishment_select",
                        placeholder: "Choose an action",
                        options: [
                            { label: "Warn", value: "WARN" },
                            { label: "Timeout 1h", value: "TIMEOUT_1H" },
                            { label: "Timeout 24h", value: "TIMEOUT_24H" },
                            { label: "Kick", value: "KICK" },
                            { label: "Ban", value: "BAN" }
                        ]
                    }
                ]
            }
        ];

        return channel.send({ embeds: [embed], components });
    }
}

module.exports = { PunishmentMenu };
