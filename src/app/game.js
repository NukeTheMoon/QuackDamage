function Game() {

    var game = {};

    game.onFrame = new Event('onFrame');
    game.scene = new THREE.Scene();
    game.models = new Models(game);
    game.viewport = new Viewport(game);
    game.playerCamera = new PlayerCamera(game);
    game.level = new Level(game);
    game.ui = new UI(game);
    game.playerControls = new PlayerControls(game);
    game.gun = new Gun(game);
    game.missileSpawner = new MissileSpawner(game);

    game.render = function () {
        requestAnimationFrame(game.render);
        document.dispatchEvent(game.onFrame);
        game.viewport.renderer.render( game.scene, game.playerCamera.camera );
    };
    game.render();

    return game;
}