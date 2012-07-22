(function (app) {
	"use strict";

	function TodoModel(title, description, id) {
		if (!(this instanceof app.TodoModel)) {
			return new app.TodoModel(title, description);
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

	app.TodoModel = TodoModel;
	invertebrate.Model.isExtendedBy(app.TodoModel);

	function TodoView(model) {
		if (!(this instanceof app.TodoView)) {
			return new app.TodoView(model);
		}

		var that = this,
			el = "<li class='todo'></li>",
			templateName = "todo";

		this.$el = $(el);
		this.Model = null;

		this.render = function (options) {
			options = options || { done: that.postRender };

			app.instance.renderTemplate(that.$el, templateName, that.Model, {
				done: function ($el) { that.bindEvents($el, options.done); }
			});
		};

		this.postRender = function () {
		};

		this.bindEvents = function ($el, done) {
			var deleteButton = $el.find(".deleteTodoButton"),
				increasePriorityButton = $el.find(".increasePriorityButton"),
				decreasePriorityButton = $el.find(".decreasePriorityButton"),
				doneButton = $el.find(".doneButton");

			deleteButton.on('click', function () {
				app.instance.todoList.Model.removeTodo(deleteButton.data("id"));
			});

			increasePriorityButton.on('click', function () {
				app.instance.todoList.Model.changeTodoPriority(increasePriorityButton.data("id"), 1);
			});

			decreasePriorityButton.on('click', function () {
				app.instance.todoList.Model.changeTodoPriority(decreasePriorityButton.data("id"), -1);
			});

			doneButton.on('click', function () {
				var todo = app.instance.todoList.Model.getTodo(doneButton.data("id"));
				app.instance.todoList.Model.removeTodo(doneButton.data("id"));
				app.instance.completedTodoList.Model.addTodo(todo);
			});

			done($el);
		};

		function init() {
			if (!model) { throw "model not supplied"; }

			that.Model = model;

			return _.extend(that, new invertebrate.View());
		}

		return init();
	}
	
	app.TodoView = TodoView;
	invertebrate.View.isExtendedBy(app.TodoView);
}(todoApp));
