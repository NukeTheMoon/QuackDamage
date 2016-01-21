function Gun(game) {

    var gun = {};

    gun.model = null;

    gun.setPosition = function() {
        gun.model.scene.position.x = 0.5; // positive: right, negative: left
        gun.model.scene.position.y = -1; // positive: up, negative: down
        gun.model.scene.position.z = 1.5; // positive: behind, negative: forward
        gun.model.scene.rotation.y = - 2 * (Math.PI / 2);
    };

    gun.onAllModelsLoadedListener = function() {
        gun.model = game.models.fetch("gun");
        gun.setPosition();
        game.playerCamera.camera.add(gun.model.scene);
    };

    gun.spawn = function() {
        document.addEventListener('onAllModelsLoaded', gun.onAllModelsLoadedListener);
        game.models.addToScene("gun");
    };

    gun.initialize = function() {
        gun.spawn();
    };

    gun.initialize();

    return gun;

}