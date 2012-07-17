(function(app) {
	app.TodoModel = function(title, description) {
		"use strict";

		if (!(this instanceof app.TodoModel)) {
			return new app.TodoModel(title, description); 
		}

		var that = this;

		function init() {
			if(!title) { throw "title not supplied"; }
			if(!description) { throw "description not supplied"; }

			that.title = title;
			that.description = description;

			return that;
		}

		return init();
	};

	app.TodoView = function(model) {
		"use strict";

		if (!(this instanceof app.TodoView)) {
			return new app.TodoView(model);
		}

		var that = this, 
			_el = "<li class='todo'></li>", 
			_templateName = "todo";

		this.$el = $(_el);

		this.Model = null;
	
		this.render = function(options) {
			return app.instance.renderTemplate(that.$el, _templateName, that.Model, options);
		};
	
		this.postRender = function() {
		};

		function init() {
			if(!model) { throw "model not supplied"; }
			
			that.Model = model;
			return _.extend(that, new invertebrate.View());
		}

		return init();
	};
}(todoApp));

