function Viewport(game) {

    var viewport = {};

    viewport.updateSize = function() {
        // Get the dimensions of the viewport
        viewport.width = $(window).width();
        viewport.height = $(window).height();
        viewport.aspect = viewport.width/viewport.height;
        if (viewport.initialized) {
            viewport.container.width(viewport.width);
            viewport.container.height(viewport.height);
            viewport.renderer.setSize(viewport.width, viewport.height);
            viewport.camera.aspect = viewport.aspect;
            viewport.camera.updateProjectionMatrix();
        }
    };

    $(document).ready(viewport.updateSize);    // When the page first loads
    $(window).resize(viewport.updateSize);     // When the browser changes size

    viewport.viewAngle = 45;
    viewport.near = 0.1;
    viewport.far = 1000;
    viewport.container = $('#project-canvas');
    viewport.scene = new THREE.Scene();
    viewport.camera = new THREE.PerspectiveCamera(viewport.viewAngle, viewport.aspect, viewport.near, viewport.far);
    viewport.renderer = new THREE.WebGLRenderer();
    viewport.scene.add(viewport.camera);
    viewport.container.width(viewport.width);
    viewport.container.height(viewport.height);
    viewport.renderer.setSize(viewport.width, viewport.height);
    viewport.container.append(viewport.renderer.domElement);
    viewport.initialized = true;

    return viewport;
}