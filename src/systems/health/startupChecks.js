function runStartupChecks(client) {
    const missing = [];

    // Validate categories
    for (const [key, value] of Object.entries(client.config.categories)) {
        if (!value) missing.push(`Category: ${key}`);
    }

    // Validate channels
    for (const [key, value] of Object.entries(client.config.channels)) {
        if (!value) missing.push(`Channel: ${key}`);
    }

    // Validate roles
    for (const [key, value] of Object.entries(client.config.roles)) {
        if (!value) missing.push(`Role: ${key}`);
    }

    if (missing.length > 0) {
        client.health.errors.report(
            "CONFIG_VALIDATION",
            `Missing required IDs:\n${missing.join("\n")}`
        );
    }

    console.log("[HEALTH] Startup checks complete");
}

module.exports = { runStartupChecks };
