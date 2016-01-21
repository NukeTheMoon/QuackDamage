function Level(game) {

    var level = {};

    level.model = null;

    level.initialize = function() {
        level.initializeSky(0x3fbfff);
        level.initializeLight();
        level.spawn();
    };

    level.initializeSky = function(color) {
        game.viewport.renderer.setClearColor(color);
        game.viewport.renderer.clear();
    };

    level.initializeLight = function() {
        level.light = new THREE.AmbientLight();
        game.scene.add(level.light);
    };

    level.onAllModelsLoadedListener = function() {
        level.model = game.models.addToScene("level");
    };

    level.spawn = function() {
        document.addEventListener('onAllModelsLoaded', level.onAllModelsLoadedListener);
    };

    level.initialize();

    return level;
}