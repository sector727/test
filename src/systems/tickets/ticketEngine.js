const { TicketCreator } = require("./ticketCreator");
const { TicketCloser } = require("./ticketCloser");
const { TicketLogger } = require("./ticketLogger");
const { TicketStorage } = require("./ticketStorage");
const { registerTicketEvents } = require("./ticketEvents");

function initTicketEngine(client) {
    client.tickets = {
        creator: new TicketCreator(client),
        closer: new TicketCloser(client),
        logger: new TicketLogger(client),
        storage: new TicketStorage()
    };

    registerTicketEvents(client);
}

module.exports = { initTicketEngine };
