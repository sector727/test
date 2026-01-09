const { initBehaviorEngine } = require("./behaviorEngine");

module.exports = {
    initBehaviorSystem(client) {
        initBehaviorEngine(client);
        console.log("[BEHAVIOR] Behavior system initialized");
    }
};
