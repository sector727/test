class PatternAnalyzer {
    constructor(client) {
        this.client = client;
        this.lastMessages = new Map(); // userID -> last message content
    }

    analyze(message) {
        const content = message.content.toLowerCase();
        const userID = message.author.id;

        // 1. Link spam
        if (content.includes("http://") || content.includes("https://"))
            return "LINK_SPAM";

        // 2. Wall of text
        if (content.length > 600)
            return "WALL_OF_TEXT";

        // 3. Character spam (aaaaaa, !!!!!!!!)
        if (/([a-zA-Z!?.])\1{6,}/.test(content))
            return "CHARACTER_SPAM";

        // 4. Emoji spam
        const emojiCount = [...content].filter(c => /\p{Emoji}/u.test(c)).length;
        if (emojiCount > 10)
            return "EMOJI_SPAM";

        // 5. Keyboard smash
        if (/^[asdfghjklqwertyuiopzxcvbnm]{12,}$/.test(content))
            return "KEYBOARD_SMASH";

        // 6. Repeated message
        const last = this.lastMessages.get(userID);
        if (last && last === content)
            return "REPEATED_MESSAGE";

        this.lastMessages.set(userID, content);

        return null;
    }
}

module.exports = { PatternAnalyzer };
