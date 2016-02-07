function Models(game) {

    var models = {};

    models.homeUrlPrefix = "/~moon/quackdamage/"; // CHANGE ME!
    models.loaded = {};
    models.loader = new THREE.ColladaLoader();
    models.allModelsLoaded = false;
    models.onAllModelsLoaded = new Event('onAllModelsLoaded');
    models.backlog = [];
    models.list = {
        level: models.homeUrlPrefix + "dae/level.dae",
        gun: models.homeUrlPrefix + "dae/q3rocket.dae",
        missile: models.homeUrlPrefix + "dae/missile.dae"
    };
    models.alphas = {
        missile: THREE.ImageUtils.loadTexture(models.homeUrlPrefix + "dae/missile_alpha.png")
    };

    models.initialize = function() {
        models.load(models.list);
    };

    models.attemptFinalize = function() {
        if (Object.keys(models.loaded).length === Object.keys(models.list).length) {
            models.allModelsLoaded = true;
            document.dispatchEvent(models.onAllModelsLoaded);
        }
    };

    models.load = function(urls) {
        models.loader.options.convertUpAxis = true;
        $.each(urls, function(key, value) {
            models.loader.load(
                value,
                function (collada) {
                    models.loaded[key] = collada;
                    if (key in models.alphas) {
                        models.loaded[key].scene.children[0].material.alphaMap = models.alphas[key];
                    }
                    models.attemptFinalize();
                },
                function (xhr) {
                    console.log(('Loading ' + key + ' ' + xhr.loaded / xhr.total * 100) + '% loaded');
                }
            );
        });
    };

    models.fetch = function(name) {
        if (name in models.loaded) {
            return models.loaded[name];
        }
        console.error("Failed to fetch model " + "\'" + name + "\'!");
        return null;
    };

    models.addBacklogToScene = function() {
        for (var i=0; i<models.backlog.length; ++i) {
            models.addToScene(models.backlog[i]);
        }
    };

    models.onAllModelsLoadedListener = function() {
        models.addBacklogToScene();
        document.removeEventListener('onAllModelsLoaded', models.onAllModelsLoadedListener);
    };

    models.addToScene = function(name) {
        if (models.allModelsLoaded) {
            var fetched = game.models.fetch(name).scene;
            var instance = fetched.clone(true);
            game.scene.add(instance);
            return instance;
        } else {
            models.backlog.push(name);
            document.addEventListener('onAllModelsLoaded', models.onAllModelsLoadedListener); // js auto-prevents adding the same event to the same DOM element
        }
    };

    models.initialize();

    return models;
}