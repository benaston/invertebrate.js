(function(app) {
	app.TodoModel = function(title, description, id) {
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
			that.id = id || guidGenerator();

			return that;
		}

		return init();
	};

	app.TodoView = function(model) {
		"use strict"
		if (!(this instanceof app.TodoView)) {
			return new app.TodoView(model);
		}

		var that = this, 
			_el = "<li class='todo'></li>", 
			_templateName = "todo";

		this.$el = $(_el);

		this.Model = null;
	
		this.render = function(options) {
			options = options || { done: function() {} };
			
			app.instance.renderTemplate(that.$el, _templateName, that.Model, { 
				done: function() { 
					var deleteButton = that.$el.find(".deleteTodoButton");
					deleteButton.on('click', function() {
						app.instance.todoList.Model.removeTodo(deleteButton.data("id"));
					});

					var increasePriorityButton = that.$el.find(".increasePriorityButton");
					increasePriorityButton.on('click', function() {
						app.instance.todoList.Model.changeTodoPriority(increasePriorityButton.data("id"), 1);
					});

					var decreasePriorityButton = that.$el.find(".decreasePriorityButton");
					decreasePriorityButton.on('click', function() {
						app.instance.todoList.Model.changeTodoPriority(decreasePriorityButton.data("id"), -1);
					});
					
					options.done(that.$el); 
					that.postRender(); 
				} });
		};
	
		this.postRender = function() {
			var theOther = this;
			


		};

		function init() {
			if(!model) { throw "model not supplied"; }
			
			that.Model = model;
			return _.extend(that, new invertebrate.View());
		}

		return init();
	};
}(todoApp));

