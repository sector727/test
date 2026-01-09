const { BehaviorScore } = require("./behaviorScore");
const { SpamDetector } = require("./spamDetector");
const { RaidDetector } = require("./raidDetector");
const { AbuseDetector } = require("./abuseDetector");
const { registerBehaviorEvents } = require("./behaviorEvents");

function initBehaviorEngine(client) {
    client.behavior = {
        score: new BehaviorScore(client),
        spam: new SpamDetector(client),
        raid: new RaidDetector(client),
        abuse: new AbuseDetector(client)
    };

    registerBehaviorEvents(client);
}

module.exports = { initBehaviorEngine };
