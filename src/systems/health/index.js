const { initHealthEngine } = require("./healthEngine");

module.exports = {
    initHealthSystem(client) {
        initHealthEngine(client);
        console.log("[HEALTH] Health system initialized");
    }
};
