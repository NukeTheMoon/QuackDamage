function Missile(game) {

    var missile = {};

    missile.model = null;
    missile.speed = 0.05;
    missile.origin = null;
    missile.maxDistance = 500;

    missile.initialize = function() {
        missile.spawn();
    };

    missile.setPosition = function() {
        missile.origin = game.gun.getOrigin();
        var near = 5; // http://i.imgur.com/KfucOsR.png
        missile.model.position.x = (missile.origin.x) / near;
        missile.model.position.y = (missile.origin.y) / near;
        missile.model.position.z = (missile.origin.z) / near;
    };

    missile.setRotation = function() {
        missile.model.lookAt(game.playerCamera.camera.position);
    };

    missile.travel = function() {
        missile.model.position.x += missile.origin.x * missile.speed;
        missile.model.position.y += missile.origin.y * missile.speed;
        missile.model.position.z += missile.origin.z * missile.speed;
    };

    missile.despawn = function() {
        if (Math.abs(missile.model.position.x) > missile.maxDistance ||
            Math.abs(missile.model.position.y) > missile.maxDistance ||
            Math.abs(missile.model.position.z) > missile.maxDistance) {
            game.scene.remove(missile.model);
        }
    };

    missile.onFrameListener = function() {
        missile.setRotation();
        missile.travel();
        missile.despawn();
    };

    missile.setTravel = function() {
        document.addEventListener('onFrame', missile.onFrameListener);
    };

    missile.spawn = function() {
        missile.model = game.models.addToScene("missile");

        //missile.model.children[0].material.alphaMap =

        missile.setPosition();
        missile.setTravel();
    };

    missile.initialize();

    return missile;

}