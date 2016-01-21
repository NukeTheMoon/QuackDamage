function Gun(game) {

    var gun = {};

    gun.model = null;

    gun.setPosition = function() {
        gun.model.scene.position.x = 0.5;
        gun.model.scene.position.y = -1;
        gun.model.scene.position.z = 1.5; //
        gun.model.scene.rotation.y = - 2 * (Math.PI / 2);
        game.playerCamera.camera.add(gun.model.scene);

    };

    gun.onAllModelsLoadedListener = function() {
        gun.model = game.models.fetch("gun");
        gun.setPosition();
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