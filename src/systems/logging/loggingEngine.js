const { LogRouter } = require("./logRouter");
const { LogFormatter } = require("./logFormatter");
const { LogWriter } = require("./logWriter");

function initLoggingEngine(client) {
    client.logging = {
        router: new LogRouter(client),
        formatter: new LogFormatter(),
        writer: new LogWriter(client)
    };
}

module.exports = { initLoggingEngine };
