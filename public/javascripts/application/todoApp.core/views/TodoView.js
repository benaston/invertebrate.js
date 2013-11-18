(function (appRoot) {
	"use strict";

	function TodoView(model) {
		if (!(this instanceof appRoot.TodoView)) {
			return new appRoot.TodoView(model);
		}

		var that = this,
			el = "<li class='todo'></li>",
			templateName = "todo";

		this.$el = $(el);
		this.Model = null;

		this.render = function (options) {
			options = options || { done: that.postRender };

			appRoot.instance.renderTemplate(that.$el, templateName, that.Model, {
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
				appRoot.instance.todoList.Model.removeTodo(deleteButton.data("id"));
			});

			increasePriorityButton.on('click', function () {
				appRoot.instance.todoList.Model.changeTodoPriority(increasePriorityButton.data("id"), 1);
			});

			decreasePriorityButton.on('click', function () {
				appRoot.instance.todoList.Model.changeTodoPriority(decreasePriorityButton.data("id"), -1);
			});

			doneButton.on('click', function () {
				var todo = appRoot.instance.todoList.Model.getTodo(doneButton.data("id"));
				appRoot.instance.todoList.Model.removeTodo(doneButton.data("id"));
				appRoot.instance.completedTodoList.Model.addTodo(todo);
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
	
	appRoot.TodoView = TodoView;
    appRoot.invertebrate.View.isExtendedBy(appRoot.TodoView);
}(appRoot));
