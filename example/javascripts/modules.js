//order of declaration matters here

(function (mod) {
	"use strict";

	mod.ConfigSvc = new ConfigSvc()(window.todoApp.env);
}(window.todoApp.mod("config")));

(function (mod) {
	"use strict";

	mod.CookieSvc = new CookieSvc()();
}(window.todoApp.mod("ui")));
