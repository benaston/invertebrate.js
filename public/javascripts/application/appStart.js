jQuery(document).ready(function () {
    "use strict";

    window.appRoot.instance = new appRoot.App(window.appRoot.invertebrate.env.dev);

    _.each(window.appRoot.mod("views"), function (v) {
        v.onDomReady();
    });

    //this happens at the end here to ensure everything (including the DOM) is initialized before routing begins
    window.appRoot.instance.router = new window.appRoot.invertebrate.Router('Todo App');
    window.appRoot.instance.registerRoutes();
});



