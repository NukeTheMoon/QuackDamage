function Missile(game) {

    var missile = {};

    missile.model = null;
    missile.speed = 0.1;

    missile.initialize = function() {
        missile.spawn();

    };

    missile.setPosition = function() {
        missile.model.position.x = 0.5;
        missile.model.position.y = 1;
        missile.model.position.z = -2;
        //missile.model.position.set(game.gun.origin.x, game.gun.origin.y, game.gun.origin.z);
    };

    missile.travel = function() {
        missile.model.position.z -= missile.speed;
    };

    missile.onFrameListener = function() {
        missile.travel();
    };

    missile.setTravel = function() {
        document.addEventListener('onFrame', missile.onFrameListener);
    };

    missile.spawn = function() {
        missile.model = game.models.addToScene("missile");
        missile.setPosition();
        missile.setTravel();
    };

    missile.initialize();

    return missile;

}