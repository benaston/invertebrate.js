(function (appRoot) {
	"use strict";

	function TodoView(model) {
		if (!(this instanceof todoList.TodoView)) {
			return new todoList.TodoView(model);
		}

		var that = this,
			el = "<li class='todo'></li>",
			templateName = "todo";

		this.$el = $(el);
		this.Model = null;

		this.render = function (options) {
			options = options || { done: that.postRender };

			todoList.instance.renderTemplate(that.$el, templateName, that.Model, {
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
				todoList.instance.todoList.Model.removeTodo(deleteButton.data("id"));
			});

			increasePriorityButton.on('click', function () {
				todoList.instance.todoList.Model.changeTodoPriority(increasePriorityButton.data("id"), 1);
			});

			decreasePriorityButton.on('click', function () {
				todoList.instance.todoList.Model.changeTodoPriority(decreasePriorityButton.data("id"), -1);
			});

			doneButton.on('click', function () {
				var todo = todoList.instance.todoList.Model.getTodo(doneButton.data("id"));
				todoList.instance.todoList.Model.removeTodo(doneButton.data("id"));
				todoList.instance.completedTodoList.Model.addTodo(todo);
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
	
	todoList.TodoView = TodoView;
    todoList.invertebrate.View.isExtendedBy(todoList.TodoView);
}(todoList));
