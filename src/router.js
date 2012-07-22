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
		
		function init() {
			$(document).on('click', 'a:not([data-bypass])', function (evt) {
				var href = $(this).attr('href');
				var protocol = 'http//';

				if (href.slice(protocol.length) !== protocol) {
					evt.preventDefault();
					that.route(href);
				}
			});
		}
		
		init();
	}

	invertebrate.Router = Router;
}(invertebrate));
