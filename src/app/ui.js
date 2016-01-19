function UI(game) {

    var ui = {};

    ui.initialize = function() {
        ui.blocker = $("#blocker");
        ui.instructions = $("#instructions");
    };

    ui.initialize();

    return ui;

}