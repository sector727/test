const { initVIPEngine } = require("./vipEngine");

module.exports = {
    initVIPSystem(client) {
        initVIPEngine(client);
        console.log("[VIP] VIP Access system initialized");
    }
};
