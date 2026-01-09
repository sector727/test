const { runStartupChecks } = require("./startupChecks");
const { startHeartbeat } = require("./heartbeat");
const { StatusManager } = require("./statusManager");
const { ErrorReporter } = require("./errorReporter");

function initHealthEngine(client) {
    client.health = {
        status: new StatusManager(client),
        errors: new ErrorReporter(client)
    };

    runStartupChecks(client);
    startHeartbeat(client);
}

module.exports = { initHealthEngine };
