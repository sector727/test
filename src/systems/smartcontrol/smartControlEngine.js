const { CooldownManager } = require("./cooldownManager");
const { AdaptiveResponder } = require("./adaptiveResponder");
const { PatternAnalyzer } = require("./patternAnalyzer");
const { registerSmartEvents } = require("./smartEvents");

function initSmartControlEngine(client) {
    client.smart = {
        cooldowns: new CooldownManager(client),
        responder: new AdaptiveResponder(client),
        patterns: new PatternAnalyzer(client)
    };

    registerSmartEvents(client);
}

module.exports = { initSmartControlEngine };
