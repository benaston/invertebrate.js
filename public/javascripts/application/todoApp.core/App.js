(function (appRoot) {
    "use strict";

    function App(env) {
        if (!(this instanceof appRoot.App)) {
            return new appRoot.App(env);
        }

        var that = this;

        this.registerRoutes = function () {

//            that.router.registerRoute('/foo/bar', function (dto) {
//                appRoot.mod("controllers").fooController.update(dto);
//            }, { silent: true });

        };

        function init() {
            if (!env) {
                throw "env not supplied";
            }

            that.env = env;

            return _.extend(that, new invertebrate.App(appRoot.mod("templates").TemplateServerSvc));
        }

        return init();
    }

    appRoot.App = App;
}(appRoot));