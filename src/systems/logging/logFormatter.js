class LogFormatter {
    base(type, title, description) {
        return {
            title: `[${type}] ${title}`,
            description: description,
            color: 0x2b2d31,
            timestamp: new Date()
        };
    }

    moderation(action, user, moderator, reason) {
        return this.base(
            "MODERATION",
            action,
            `User: <@${user}>\nModerator: <@${moderator}>\nReason: ${reason}`
        );
    }

    ticket(event, user, ticketID) {
        return this.base(
            "TICKETS",
            event,
            `User: <@${user}>\nTicket ID: ${ticketID}`
        );
    }

    photo(event, user, details) {
        return this.base(
            "PHOTOS",
            event,
            `User: <@${user}>\nDetails: ${details}`
        );
    }

    smart(event, user, details) {
        return this.base(
            "SMARTCONTROL",
            event,
            `User: <@${user}>\nDetails: ${details}`
        );
    }

    audit(event, details) {
        return this.base(
            "AUDIT",
            event,
            details
        );
    }

    system(event, details) {
        return this.base(
            "SYSTEM",
            event,
            details
        );
    }
}

module.exports = { LogFormatter };
