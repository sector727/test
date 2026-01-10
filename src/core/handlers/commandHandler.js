const fs = require("fs");
const path = require("path");

function loadCommands(client) {
    client.commands = new Map();

    const commandsPath = path.join(__dirname, "../commands");
    const files = fs.readdirSync(commandsPath).filter(f => f.endsWith(".js"));

    for (const file of files) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);

        // Validate structure
        if (!command.data || !command.execute) {
            console.warn(`[COMMANDS] Skipped invalid command: ${file}`);
            continue;
        }

        client.commands.set(command.data.name, command);
    }

    console.log(`[COMMANDS] Loaded ${client.commands.size} commands`);
}

module.exports = { loadCommands };
