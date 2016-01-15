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

    viewport.viewAngle = 75;
    viewport.near = 0.1;
    viewport.far = 1000;
    viewport.container = $('#project-canvas');
    viewport.camera = new THREE.PerspectiveCamera(viewport.viewAngle, viewport.aspect, viewport.near, viewport.far);
    viewport.renderer = new THREE.WebGLRenderer();
    game.scene.add(viewport.camera);
    viewport.controls = new THREE.PointerLockControls( viewport.camera );
    game.scene.add( viewport.controls.getObject() );
    viewport.container.width(viewport.width);
    viewport.container.height(viewport.height);
    viewport.renderer.setSize(viewport.width, viewport.height);
    viewport.container.append(viewport.renderer.domElement);
    viewport.initialized = true;

    viewport.render = function () {
        requestAnimationFrame(viewport.render);
        viewport.renderer.render( game.scene, viewport.camera );
    }
    viewport.render();

    viewport.camera.position.z = 10;
    var element = document.body;
    var havePointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;
    if ( havePointerLock ) {
        var element = document.body;
        var pointerlockchange = function ( event ) {
            if ( document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element ) {
                controlsEnabled = true;
                viewport.controls.enabled = true;
            } else {
                viewport.controls.enabled = false;
            }
        };
        var pointerlockerror = function ( event ) {

        };
        // Hook pointer lock state change events
        document.addEventListener( 'pointerlockchange', pointerlockchange, false );
        document.addEventListener( 'mozpointerlockchange', pointerlockchange, false );
        document.addEventListener( 'webkitpointerlockchange', pointerlockchange, false );
        document.addEventListener( 'pointerlockerror', pointerlockerror, false );
        document.addEventListener( 'mozpointerlockerror', pointerlockerror, false );
        document.addEventListener( 'webkitpointerlockerror', pointerlockerror, false );
        element.addEventListener( 'click', function ( event ) {
            // Ask the browser to lock the pointer
            element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
            if ( /Firefox/i.test( navigator.userAgent ) ) {
                var fullscreenchange = function ( event ) {
                    if ( document.fullscreenElement === element || document.mozFullscreenElement === element || document.mozFullScreenElement === element ) {
                        document.removeEventListener( 'fullscreenchange', fullscreenchange );
                        document.removeEventListener( 'mozfullscreenchange', fullscreenchange );
                        element.requestPointerLock();
                    }
                };
                document.addEventListener( 'fullscreenchange', fullscreenchange, false );
                document.addEventListener( 'mozfullscreenchange', fullscreenchange, false );
                element.requestFullscreen = element.requestFullscreen || element.mozRequestFullscreen || element.mozRequestFullScreen || element.webkitRequestFullscreen;
                element.requestFullscreen();
            } else {
                element.requestPointerLock();
            }
        }, false );
    }

    var controlsEnabled = false;
    var moveForward = false;
    var moveBackward = false;
    var moveLeft = false;
    var moveRight = false;
    var canJump = false;

    var onKeyDown = function ( event ) {
        switch ( event.keyCode ) {
            case 38: // up
            case 87: // w
                moveForward = true;
                break;
            case 37: // left
            case 65: // a
                moveLeft = true; break;
            case 40: // down
            case 83: // s
                moveBackward = true;
                break;
            case 39: // right
            case 68: // d
                moveRight = true;
                break;
            case 32: // space
                if ( canJump === true ) velocity.y += 350;
                canJump = false;
                break;
        }
    };
    var onKeyUp = function ( event ) {
        switch( event.keyCode ) {
            case 38: // up
            case 87: // w
                moveForward = false;
                break;
            case 37: // left
            case 65: // a
                moveLeft = false;
                break;
            case 40: // down
            case 83: // s
                moveBackward = false;
                break;
            case 39: // right
            case 68: // d
                moveRight = false;
                break;
        }
    };
    document.addEventListener( 'keydown', onKeyDown, false );
    document.addEventListener( 'keyup', onKeyUp, false );

    return viewport;

}