function MissileSpawner(game) {

    var missileSpawner = {};

    missileSpawner.missiles = [];
    missileSpawner.canSpawn = false;

    missileSpawner.initialize = function () {
        document.addEventListener('onAllModelsLoaded', missileSpawner.onAllModelsLoadedListener);
        $(document).click(function() {
            missileSpawner.spawnMissile();
        });

    };

    missileSpawner.onAllModelsLoadedListener = function () {
        missileSpawner.canSpawn = true;

    };

    missileSpawner.spawnMissile = function () {
        if (missileSpawner.canSpawn) {
            missileSpawner.missiles.push(new Missile(game));
        }
    };

    missileSpawner.initialize();

    return missileSpawner;

}