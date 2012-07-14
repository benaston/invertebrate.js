//order of declaration matters here

(function (mod) {
	"use strict";

	mod.ConfigSvc = new ConfigSvc(app.env);
}(app.mod("config")));
