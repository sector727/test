const { VIPValidator } = require("./vipValidator");
const { DuplicateDetector } = require("./duplicateDetector");
const { InternetDetector } = require("./internetDetector");
const { AIDetector } = require("./aiDetector");
const { MediaTypeChecker } = require("./mediaTypeChecker");
const { VIPTimer } = require("./vipTimer");
const { registerVIPEevents } = require("./vipEvents");

function initVIPEngine(client) {
    client.vip = {
        validator: new VIPValidator(client),
        duplicates: new DuplicateDetector(client),
        internet: new InternetDetector(client),
        ai: new AIDetector(client),
        media: new MediaTypeChecker(client),
        timer: new VIPTimer(client)
    };

    registerVIPEevents(client);
}

module.exports = { initVIPEngine };
