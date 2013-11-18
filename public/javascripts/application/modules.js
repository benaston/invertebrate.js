//order of declaration matters here.
(function (mod) {
    "use strict";

    try {
//        mod.UIMode = {
//            Fight: "0",
//            MonsterEditor: "1"
//        };

    } catch (e) {
        throw "problem registering enum module. " + e;
    }

}(appRoot.mod("enum")));


(function (mod) {
    "use strict";

    try {
        mod.config = new appRoot.Config(appRoot.invertebrate.env.dev);
    }
    catch (e) {
        throw "problem registering config module. " + e;
    }

}(appRoot.mod("config")));

(function (mod) {
    "use strict";

    try {
    }
    catch (e) {
        throw "problem registering services module. " + e;
    }

}(appRoot.mod("services")));

(function (mod) {
    "use strict";

    try {
    }
    catch (e) {
        throw "problem registering caches module. " + e;
    }

}(appRoot.mod("caches")));

(function (mod) {

    try {
    }
    catch (e) {
        throw "problem registering repositories module. " + e;
    }

}(appRoot.mod("repositories")));

(function (mod) {
    "use strict";

    try {
        mod.TemplateServerSvc = new invertebrate.TemplateServerSvc(appRoot.mod("config").config,
            function () {
                return '/templates';
            });
    }
    catch (e) {
        throw "problem registering templates module. " + e;
    }

}(appRoot.mod("templates")));

(function (mod) {
    "use strict";

    try {
//        mod.uiRootModel = new appRoot.UIRootModel();
    }
    catch (e) {
        throw "problem registering models module. " + e;
    }

}(appRoot.mod("models")));

(function (mod) {
    "use strict";

    try {

    }
    catch (e) {
        throw "problem registering factories module. " + e;
    }

}(appRoot.mod("factories")));

(function (mod) {
    "use strict";

    try {
//        mod.uiRootView = new appRoot.UIRootView(appRoot.mod("models").uiRootModel);
    }
    catch (e) {
        throw "problem registering views module. " + e;
    }

}(appRoot.mod("views")));

(function (mod) {
    "use strict";

    try {
//        mod.homeController = new appRoot.HomeController(appRoot.mod("models").uiRootModel);
    }
    catch (e) {
        throw "problem registering controllers module. " + e;
    }

}(appRoot.mod("controllers")));

