const { initTicketEngine } = require("./ticketEngine");

module.exports = {
    initTicketSystem(client) {
        initTicketEngine(client);
        console.log("[TICKETS] Ticket system initialized");
    }
};
