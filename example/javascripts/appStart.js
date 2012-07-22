"use strict";
self.todoApp.instance					= new todoApp.App(invertebrate.env.dev);
self.todoApp.instance.todoCreationForm	= new todoApp.TodoCreationFormView(new todoApp.TodoCreationFormModel());
self.todoApp.instance.todoList			= new todoApp.TodoListView(new todoApp.TodoListModel());
self.todoApp.instance.completedTodoList	= new todoApp.TodoListView(new todoApp.TodoListModel(), { selector: "#completedTodoList" });
self.todoApp.router						= new invertebrate.Router();

self.todoApp.router.registerRoute(todoApp.TodoModel.prototype.constructor.name, function (model, options) {
	options = options || { $parentDomNode: $('body') };
	new todoApp.TodoView(model).render({ done: function ($el) { options.$parentDomNode.append($el); } });
});
self.todoApp.router.registerRoute(todoApp.ChoreModel.prototype.constructor.name, function (model, options) {
	options = options || { $parentDomNode: $('body') };
	new todoApp.ChoreView(model).render({ done: function ($el) { options.$parentDomNode.append($el); } });
});
