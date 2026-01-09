// Main entry point for the bot

const { Client, GatewayIntentBits, Partials } = require("discord.js");
const { loadEvents } = require("./src/core/handlers/eventHandler");
const { loadCommands } = require("./src/core/handlers/commandHandler");
const config = require("./config/config.json");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ],
    partials: [Partials.Channel, Partials.Message, Partials.User]
});

client.config = config;

// Load core systems
loadEvents(client);
loadCommands(client);

client.login(config.bot.token);
