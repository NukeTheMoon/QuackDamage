$(document).ready(function() {

    getScripts([
        "src/app/models.js",
        "src/app/viewport.js",
        "src/app/playerCamera.js",
        "src/app/gun.js",
        "src/app/missile.js",
        "src/app/level.js",
        "src/app/ui.js",
        "src/app/playerControls.js",
        "src/app/game.js"
    ], function() {
        new Game();
    });

    function getScripts(scripts, callback) {
        var progress = 0;
        var internalCallback = function () {
            if (++progress == scripts.length) { callback(); }
        };
        scripts.forEach(function(script) { $.getScript(script, internalCallback); });
    }
});
