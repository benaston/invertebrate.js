(function (appRoot) {
    "use strict";

    function Config(env) {
        if (!(this instanceof todoList.Config)) {
            return new todoList.Config(env);
        }

        var that = this,
            devConfig = {
                appRootUri: "/"
            },
            prodConfig = {
                appRootUri: "http://sheltered-wave-3425.herokuapp.com/"
            },
            sharedConfig = {
                templateServerUris: { "1": "./templates/" },
                templatesUriPart: "templates/",
                templatePostRenderScriptsUriPart: "template-post-render-scripts/"
            };

        function init() {
            if (!env) {
                throw "env not supplied";
            }

            var config = _.extend(that, new invertebrate.Config(env));
            config.devConfig = devConfig;
            config.prodConfig = prodConfig;
            config.sharedConfig = sharedConfig;
            config.collateConfiguration();

            return config;
        }

        return init();
    }

    todoList.Config = Config;

}(todoList));