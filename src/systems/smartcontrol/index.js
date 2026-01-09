const { initSmartControlEngine } = require("./smartControlEngine");

module.exports = {
    initSmartControl(client) {
        initSmartControlEngine(client);
        console.log("[SMARTCONTROL] SmartControl system initialized");
    }
};
