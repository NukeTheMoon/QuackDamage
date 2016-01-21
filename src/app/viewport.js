function Viewport(game) {

    var viewport = {};

    viewport.updateSize = function() {
        viewport.width = $(window).width();
        viewport.height = $(window).height();
        viewport.aspect = viewport.width/viewport.height;
        if (viewport.initialized) {
            viewport.container.width(viewport.width);
            viewport.container.height(viewport.height);
            viewport.renderer.setSize(viewport.width, viewport.height);
            if (game.playerCamera.camera) {
                game.playerCamera.camera.aspect = viewport.aspect;
                game.playerCamera.camera.updateProjectionMatrix();
            }
        }
    };

    $(document).ready(viewport.updateSize);    // When the page first loads
    $(window).resize(viewport.updateSize);     // When the browser changes size

    viewport.viewAngle = 75;
    viewport.near = 0.1;
    viewport.far = 1000;
    viewport.container = $('#project-canvas');
    viewport.renderer = new THREE.WebGLRenderer();
    viewport.container.width(viewport.width);
    viewport.container.height(viewport.height);
    viewport.renderer.setSize(viewport.width, viewport.height);
    viewport.container.append(viewport.renderer.domElement);
    viewport.initialized = true;

    return viewport;

}