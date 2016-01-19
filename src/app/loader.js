$(document).ready(function() {

    var debug;

    getScripts([
        "src/app/models.js",
        "src/app/viewport.js",
        "src/app/playerCamera.js",
        "src/app/level.js",
        "src/app/ui.js",
        "src/app/playerControls.js",
        "src/app/game.js"
    ], function() {
        debug = new Game();
    });

    function getScripts(scripts, callback) {
        var progress = 0;
        var internalCallback = function () {
            if (++progress == scripts.length) { callback(); }
        };

        scripts.forEach(function(script) { $.getScript(script, internalCallback); });
    }

});
