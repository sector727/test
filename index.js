// Main entry point for the bot

const { Client, GatewayIntentBits, Partials } = require("discord.js");
const config = require("./config/config.json");

// Core loaders
const { loadEvents } = require("./src/core/handlers/eventHandler");
const { loadCommands } = require("./src/core/handlers/commandHandler");
const { validateConfig } = require("./src/core/startup/configValidator");

// Subsystems
const { initHealthSystem } = require("./src/systems/health");
const { initLoggingSystem } = require("./src/systems/logging");
const { initModerationSystem } = require("./src/systems/moderation");
const { initTicketSystem } = require("./src/systems/tickets");
const { initVIPSystem } = require("./src/systems/vip");
const { initTimerSystem } = require("./src/systems/timers");
const { initBehaviorSystem } = require("./src/systems/behavior");
const { initSmartControl } = require("./src/systems/smartcontrol");

// Create client
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

// Startup sequence
client.once("ready", async () => {
    console.log(`[READY] Logged in as ${client.user.tag}`);

    // 1. Validate config
    validateConfig(config);

    // 2. Initialize core systems
    initHealthSystem(client);
    initLoggingSystem(client);

    // 3. Initialize moderation + tickets
    initModerationSystem(client);
    initTicketSystem(client);

    // 4. Initialize VIP + timers
    initVIPSystem(client);
    initTimerSystem(client);

    // 5. Initialize behavior + smartcontrol
    initBehaviorSystem(client);
    initSmartControl(client);

    console.log("[STARTUP] All systems online.");
});

// Load commands + events BEFORE login
loadEvents(client);
loadCommands(client);

// Login
client.login(config.bot.token);
