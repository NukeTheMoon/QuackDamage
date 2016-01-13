$(document).ready(function() {

    function getScripts(scripts, callback) {
        var progress = 0;
        var internalCallback = function () {
            if (++progress == scripts.length) { callback(); }
        };

        scripts.forEach(function(script) { $.getScript(script, internalCallback); });
    };

    getScripts([
        "src/app/viewport.js",
        "src/app/level.js",
        "src/app/game.js"
    ], function() {
        new Game();
    });

});
