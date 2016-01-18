function PlayerCamera(game) {

    var playerCamera = {};

    playerCamera.initialize = function() {
        playerCamera.camera = new THREE.PerspectiveCamera(
            game.viewport.viewAngle,
            game.viewport.aspect,
            game.viewport.near,
            game.viewport.far
        );
        game.scene.add(playerCamera.camera);
    };

    playerCamera.initialize();

    return playerCamera;

}