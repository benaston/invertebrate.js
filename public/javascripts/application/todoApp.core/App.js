(function (appRoot) {
    "use strict";

    function App(env) {
        if (!(this instanceof todoList.App)) {
            return new todoList.App(env);
        }

        var that = this;

        this.registerRoutes = function () {

//            that.router.registerRoute('/foo/bar', function (dto) {
//                todoList.mod("controllers").fooController.update(dto);
//            }, { silent: true });

        };

        function init() {
            if (!env) {
                throw "env not supplied";
            }

            that.env = env;

            return _.extend(that, new invertebrate.App(todoList.mod("templates").TemplateServerSvc));
        }

        return init();
    }

    todoList.App = App;
}(todoList));