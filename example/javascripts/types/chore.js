(function (app) {
	"use strict";

	function ChoreModel(title, description, id) {

		if (!(this instanceof app.ChoreModel)) {
			return new app.ChoreModel(title, description);
		}

		var that = this;

		function init() {
			if (!title) { throw "title not supplied"; }
			if (!description) { throw "description not supplied"; }

			that.title = title;
			that.description = description;
			that.id = id || guidGenerator();

			return that;
		}

		return init();
	}

	app.ChoreModel = ChoreModel;
	invertebrate.Model.isExtendedBy(app.ChoreModel);

	function ChoreView(model) {

		if (!(this instanceof app.ChoreView)) {
			return new app.ChoreView(model);
		}

		var that = this,
			el = "<li class='chore'></li>",
			templateName = "todo";

		this.$el = $(el);

		this.Model = null;

		this.render = function (options) {
			options = options || { done: that.postRender };

			app.instance.renderTemplate(that.$el, templateName, that.Model, {
				done: function ($el) { that.bindEvents($el, options.done); } });
		};

		this.postRender = function () {
		};

		function init() {
			if (!model) { throw "model not supplied"; }

			that.Model = model;
			that.bindEvents = new todoApp.TodoView(that.Model).bindEvents;
			
			return _.extend(that, new invertebrate.View());
		}

		return init();
	}

	app.ChoreView = ChoreView;
	invertebrate.View.isExtendedBy(app.TodoView);
}(todoApp));
