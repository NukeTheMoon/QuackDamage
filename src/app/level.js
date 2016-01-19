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
        level.model = game.models.fetch("level");
        level.model.scene.rotation.order = "YXZ";
        level.model.scene.rotation.x = -0.5 * Math.PI;
    };

    level.spawn = function() {
        document.addEventListener('onAllModelsLoaded', level.onAllModelsLoadedListener);
        game.models.addToScene("level");
    };

    level.initialize();

    return level;
}