function Game() {

    var game = {};

    game.scene = new THREE.Scene();
    game.models = new Models(game);
    game.viewport = new Viewport(game);
    game.playerCamera = new PlayerCamera(game);
    game.level = new Level(game);
    game.ui = new UI(game);
    game.playerControls = new PlayerControls(game);

    game.render = function () {
        requestAnimationFrame(game.render);
        game.viewport.renderer.render( game.scene, game.playerCamera.camera );
    };
    game.render();

    return game;
}