function Game() {

    var game = {};

    game.scene = new THREE.Scene();
    game.models = new Models(game);
    game.viewport = new Viewport(game);
    game.level = new Level(game);

    return game;
};