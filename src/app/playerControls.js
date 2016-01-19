function PlayerControls(game) {

    var playerControls = {};

    playerControls.havePointerLock = function() {
        return 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;
    };

    playerControls.initializePointerLock = function () {
        if ( playerControls.havePointerLock() ) {
            playerControls.element = document.body;
            playerControls.pointerlockchange = function (event) {
                if (document.pointerLockElement === playerControls.element
                    || document.mozPointerLockElement === playerControls.element
                    || document.webkitPointerLockElement === playerControls.element) {
                    playerControls.controls.enabled = true;
                    game.ui.blocker.css('display', 'none');
                } else {
                    playerControls.controls.enabled = false;
                    game.ui.blocker.css('display','-webkit-box');
                    game.ui.blocker.css('display','-moz-box');
                    game.ui.blocker.css('display', 'box');
                    game.ui.instructions.css('display', '');
                }
            };
            playerControls.pointerLockError = function (event ) {
                game.ui.instructions.css('display', '');
            };
            playerControls.registerPointerLockListeners();
        } else {
            game.ui.instructions.html('Your browser doesn\'t seem to support Pointer Lock API');
        }
    };

    playerControls.askBrowserToLockPointer = function() {
        playerControls.element.requestPointerLock = playerControls.element.requestPointerLock
            || playerControls.element.mozRequestPointerLock
            || playerControls.element.webkitRequestPointerLock;
        if ( /Firefox/i.test( navigator.userAgent ) ) {
            playerControls.fullscreenchange = function ( event ) {
                if ( document.fullscreenElement === playerControls.element
                    || document.mozFullscreenElement === playerControls.element
                    || document.mozFullScreenElement === playerControls.element
                ) {
                    document.removeEventListener( 'fullscreenchange', playerControls.fullscreenchange );
                    document.removeEventListener( 'mozfullscreenchange', playerControls.fullscreenchange );
                    playerControls.element.requestPointerLock();
                }
            };
            document.addEventListener( 'fullscreenchange', playerControls.fullscreenchange, false );
            document.addEventListener( 'mozfullscreenchange', playerControls.fullscreenchange, false );
            playerControls.element.requestFullscreen = playerControls.element.requestFullscreen
                || playerControls.element.mozRequestFullscreen
                || playerControls.element.mozRequestFullScreen
                || playerControls.element.webkitRequestFullscreen;
            playerControls.element.requestFullscreen();
        } else {
            playerControls.element.requestPointerLock();
        }
    };

    playerControls.registerPointerLockListeners = function() {
        document.addEventListener('pointerlockchange', playerControls.pointerlockchange, false);
        document.addEventListener('mozpointerlockchange', playerControls.pointerlockchange, false);
        document.addEventListener('webkitpointerlockchange', playerControls.pointerlockchange, false);
        document.addEventListener('pointerLockError', playerControls.pointerLockError, false);
        document.addEventListener('mozpointerlockerror', playerControls.pointerLockError, false);
        document.addEventListener('webkitpointerlockerror', playerControls.pointerLockError, false);
        game.ui.instructions.click(function (event) {
            game.ui.instructions.css('display', 'none');
            playerControls.askBrowserToLockPointer();
        });
    };

    playerControls.initialize = function() {
        playerControls.initializePointerLock();
        playerControls.controls = new THREE.PointerLockControls( game.playerCamera.camera );
        game.scene.add( playerControls.controls.getObject() );

    };

    playerControls.initialize();

    return playerControls;
}