(function (invertebrate) {
	"use strict";

	function Router() {
		this.routes = {};

		this.registerRoute = function (modelType, action) {
			this.routes[modelType] = action;
		};

		this.route = function (model, options) {
			this.routes[model.constructor.name](model, options);
		};
	}

	invertebrate.Router = Router;
}(invertebrate));
