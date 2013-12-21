(function (appRoot) {
	"use strict";

	function TodoModel(title, description, id) {
		if (!(this instanceof todoList.TodoModel)) {
			return new todoList.TodoModel(title, description);
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

	todoList.TodoModel = TodoModel;
    todoList.invertebrate.Model.isExtendedBy(todoList.TodoModel);
}(todoList));
