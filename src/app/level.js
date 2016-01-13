function Level(game) {

    initialize();

    function initialize() {
        initializeSky(0x3fbfff);
    }

    function initializeSky(color) {
        game.viewport.renderer.setClearColor(color);
        game.viewport.renderer.clear();
    }
}