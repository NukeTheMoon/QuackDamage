function Game() {

    var game = {};

    game.viewport = new Viewport(game);
    game.level = new Level(game);

    return game;
};