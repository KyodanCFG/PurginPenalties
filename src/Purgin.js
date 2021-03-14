exports.mod = (mod_info) => {
    logger.logInfo(`   [MOD] Loading: ${mod_info.name} (${mod_info.version}) by ${mod_info.author}`);
    let itemsCache = fileIO.readParsed(global.db.user.cache.items);						// read from server cache (items)
    let settingsFile = require("../settings.json");							        // read from settings.json file
    let gameplaySettings = settingsFile.gameplay;                                   // for tidying up code/abstraction	
    //var consoleLog = "";                                                          // TODO: for external logging

    if (gameplaySettings.purginPenalties == true) {                                   // if 'purginPenalties' var in settings.json is set to true, execute script
        for (let item in itemsCache.data) {
            let cacheData = itemsCache.data[item];								    // for tidying up code/abstraction	

            if (cacheData._parent === "5448e54d4bdc2dcc718b4568" ||                 // armor parent ID
                cacheData._parent === "5448e5284bdc2dcb718b4567" ||                 // rig parent ID
                cacheData._parent === "5a341c4086f77401f2541505" ||                 // helmet parent ID
                cacheData._parent === "57bef4c42459772e8d35a53b" ) {                // add-on armor parent ID   
                if (typeof gameplaySettings.mousePenalty_1 == "number") {
                    cacheData._props.mousePenalty = gameplaySettings.mousePenalty_1;
                } else {
                    logger.logError(`[MOD] ${mod_info.name}: 'mousePenalty_1' variable has no value/is not a number! Check user/mods/${mod_info.author}-${mod_info.name}-${mod_info.version}/settings.json`);
                    return;
                }
            }
        }

        fileIO.write(global.db.user.cache.items, itemsCache);								// write all changes back to cache (items.json specifically)
        //fileIO.write(`user/mods/${mod_info.author}-${mod_info.name}-${mod_info.version}/logs/console.log`, consoleLog);         // TODO: write to log file for ez diagnosin'
        logger.logSuccess(`[MOD] -- ${mod_info.name}: ON (${gameplaySettings.mousePenalty_1})`);
    } else {                                                                        // if 'reducinRecoil' var in settings.json is set to false, skip entire script
        logger.logSuccess(`[MOD] -- ${mod_info.name}: OFF`); 
    }
}