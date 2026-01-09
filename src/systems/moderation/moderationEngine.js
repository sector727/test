const { ApprovalQueue } = require("./approvalQueue");
const { EscalationEngine } = require("./escalationEngine");
const { PunishmentMenu } = require("./punishmentMenu");
const { ModerationRouter } = require("./moderationRouter");
const { registerModerationEvents } = require("./moderationEvents");

function initModerationEngine(client) {
    client.moderation = {
        approvals: new ApprovalQueue(client),
        escalations: new EscalationEngine(client),
        punishments: new PunishmentMenu(client),
        router: new ModerationRouter(client)
    };

    registerModerationEvents(client);
}

module.exports = { initModerationEngine };
