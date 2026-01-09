const { initModerationEngine } = require("./moderationEngine");

module.exports = {
    initModerationSystem(client) {
        initModerationEngine(client);
        console.log("[MODERATION] Moderation system initialized");
    }
};
