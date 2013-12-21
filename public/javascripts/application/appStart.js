//this stuff happens when the DOM is ready
jQuery(document).ready(function () {
    "use strict";

    window.todoList.instance = new todoList.App(invertebrate.env.dev);

    _.each(window.todoList.mod("views"), function (v) {
        v.onDomReady();
    });

    //this happens at the end here to ensure everything (including the DOM) is initialized before routing begins
    window.todoList.instance.router = new invertebrate.Router('Todo List');
    window.todoList.instance.registerRoutes();
});



