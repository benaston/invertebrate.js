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

}(todoList.mod("enum")));


(function (mod) {
    "use strict";

    try {
        mod.config = new todoList.Config(todoList.invertebrate.env.dev);
    }
    catch (e) {
        throw "problem registering config module. " + e;
    }

}(todoList.mod("config")));

(function (mod) {
    "use strict";

    try {
    }
    catch (e) {
        throw "problem registering services module. " + e;
    }

}(todoList.mod("services")));

(function (mod) {
    "use strict";

    try {
    }
    catch (e) {
        throw "problem registering caches module. " + e;
    }

}(todoList.mod("caches")));

(function (mod) {

    try {
    }
    catch (e) {
        throw "problem registering repositories module. " + e;
    }

}(todoList.mod("repositories")));

(function (mod) {
    "use strict";

    try {
        mod.TemplateServerSvc = new invertebrate.TemplateServerSvc(todoList.mod("config").config,
            function () {
                return '/templates';
            });
    }
    catch (e) {
        throw "problem registering templates module. " + e;
    }

}(todoList.mod("templates")));

(function (mod) {
    "use strict";

    try {
//        mod.uiRootModel = new todoList.UIRootModel();
    }
    catch (e) {
        throw "problem registering models module. " + e;
    }

}(todoList.mod("models")));

(function (mod) {
    "use strict";

    try {

    }
    catch (e) {
        throw "problem registering factories module. " + e;
    }

}(todoList.mod("factories")));

(function (mod) {
    "use strict";

    try {
//        mod.uiRootView = new todoList.UIRootView(todoList.mod("models").uiRootModel);
    }
    catch (e) {
        throw "problem registering views module. " + e;
    }

}(todoList.mod("views")));

(function (mod) {
    "use strict";

    try {
//        mod.homeController = new todoList.HomeController(todoList.mod("models").uiRootModel);
    }
    catch (e) {
        throw "problem registering controllers module. " + e;
    }

}(todoList.mod("controllers")));

