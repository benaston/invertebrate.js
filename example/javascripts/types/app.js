(function (app) {
	"use strict";

	function App(env) {
		if (!(this instanceof app.App)) {
			return new app.App(env);
		}

		var that = this;

		this.registerRoutes = function() {
			that.router.registerRoute(todoApp.TodoModel.prototype.constructor.name, function (model, options) {
				options = options || { $parentDomNode: $('body') };
				new todoApp.TodoView(model).render({ done: function ($el) { options.$parentDomNode.append($el); } });
			});

			that.router.registerRoute(todoApp.ChoreModel.prototype.constructor.name, function (model, options) {
				options = options || { $parentDomNode: $('body') };
				new todoApp.ChoreView(model).render({ done: function ($el) { options.$parentDomNode.append($el); } });
			});
		};

		function init() {
			if (!env) { throw "env not supplied"; }

			that.env = env;

			return _.extend(that, new invertebrate.App(app.mod("templates").TemplateServerSvc));
		}

		return init();
	}

	app.App = App;
}(todoApp));