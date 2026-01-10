const fs = require("fs");
const path = require("path");

function loadCommands(client) {
    client.commands = new Map();

    const commandsRoot = path.join(__dirname, "../commands");
    const categories = fs.readdirSync(commandsRoot);

    for (const category of categories) {
        const categoryPath = path.join(commandsRoot, category);

        if (!fs.lstatSync(categoryPath).isDirectory()) continue;

        const files = fs.readdirSync(categoryPath).filter(f => f.endsWith(".js"));

        for (const file of files) {
            const filePath = path.join(categoryPath, file);
            const command = require(filePath);

            if (!command.data || !command.execute) {
                console.warn(`[COMMANDS] Skipped invalid command: ${file}`);
                continue;
            }

            // Attach category metadata
            command.category = category;

            client.commands.set(command.data.name, command);
        }
    }

    console.log(`[COMMANDS] Loaded ${client.commands.size} commands across ${categories.length} categories`);
}

module.exports = { loadCommands };
