(function(app) {
	app.TodoCreationFormModel = function() {
		"use strict";

		if (!(this instanceof app.TodoCreationFormModel)) {		
			return new app.TodoCreationFormModel(); 
		}

		var that = this;

		function init() {
			return that;
		}

		return init();
	};

	app.TodoCreationFormView = function(model) {
		"use strict";

		if (!(this instanceof app.TodoCreationFormView)) {
			return new app.TodoCreationFormView(model);
		}

		var that = this, 
			_el = "#todoCreationForm", 
			_templateName = "todoCreationForm";

		this.$el = $(_el);

		this.Model = null;
	
		this.render = function(options) {
			options = options || { done: function() { /* do nothing */ } };
			return app.instance.renderTemplate(that.$el, _templateName, that.Model, options);
		};
	
		this.postRender = function() {
			that.$el.find("#addTodoButton").click(function(e) { 
				todoApp.instance.todoList.Model.addTodo(new todoApp.TodoModel(that.$el.find("#title").val(), that.$el.find("#description").val()));
				e.preventDefault();
				
				return false;
			});
		};

		function init() {
			if(!model) { throw "model not supplied"; }
			
			that.Model = model;
			var view = _.extend(that, new invertebrate.View());
			view.render({ done: that.postRender });
			
			return view;
		}

		return init();
	};
}(todoApp));
