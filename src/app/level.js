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
    }

    level.spawn = function() {
        game.models.addToScene("level");
    }

    level.initialize();

    return level;
}