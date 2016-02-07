function Gun(game) {

    var gun = {};

    gun.model = null;
    gun.origin = null;

    gun.setPosition = function() {
        gun.model.position.x = 0.5; // positive: right, negative: left
        gun.model.position.y = -1; // positive: up, negative: down
        gun.model.position.z = 1.5; // positive: behind, negative: forward
        gun.model.rotation.z = - 2 * (Math.PI / 2);
    };

    gun.getOrigin = function() {
        game.scene.updateMatrixWorld();
        gun.model.traverse(function (child) {
            if (child.name == "origin") {
                gun.origin = new THREE.Vector3();
                gun.origin.setFromMatrixPosition(child.matrixWorld);
            }
        });
        return gun.origin;
    };

    gun.onAllModelsLoadedListener = function() {
        gun.spawn();
    };

    gun.spawn = function() {
        gun.model = game.models.addToScene("gun");
        gun.setPosition();
        gun.getOrigin();
        game.playerCamera.camera.add(gun.model);
    };

    gun.initialize = function() {
        if (game.models.allModelsLoaded) {
            gun.spawn();
        }
        else {
            document.addEventListener('onAllModelsLoaded', gun.onAllModelsLoadedListener);
        }
    };

    gun.initialize();

    return gun;

}