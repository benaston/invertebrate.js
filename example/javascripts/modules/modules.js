//order of declaration matters here
(function (mod) {
	"use strict";

	mod.Config = new Config(app.env);
}(app.mod("config")));
