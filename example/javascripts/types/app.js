(function(app) {
	app.App = function(env) {
		"use strict";

		if (!(this instanceof app.App)) {
			return new app.App(env); 
		}

		var that = this;
			
		function init() {
			if(!env) { throw "env not supplied"; }
			
			that.env = env;

			return _.extend(that, new invertebrate.App(app.mod("templates").TemplateServerSvc));
		}

		return init();
	};
}(todoApp));