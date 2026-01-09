class TicketLogger {
    constructor(client) {
        this.client = client;
    }

    async log(event, userID, ticketID) {
        const embed = this.client.logging.formatter.ticket(event, userID, ticketID);
        await this.client.logging.writer.write("TICKETS", embed);
    }
}

module.exports = { TicketLogger };
