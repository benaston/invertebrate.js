(function(app) {
	app.TodoCreationFormModel = function() {
		"use strict";

		if (!(this instanceof app.TodoCreationFormModel)) {
			return new app.TodoCreationFormModel(); 
		}

		var that = this, _title, _description;

		this.setTitle = function(value, options) {
			that._title = value;

			if(options && options.silent === true) { return; }
			
			$.publish("/todoCreationForm/title/");
		};
		
		this.setDescription = function(value, options) {
			that._description = value;

			if(options && options.silent === true) { return; }

			$.publish("/todoCreationForm/description/");
		};

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
			that.$el.find("#title").live('change', function() {
				that.Model.setTitle(that.$el.find("#description").val(), { silent: true })
			});
			
			that.$el.find("#description").live('change', function() {
				that.Model.setDescription(that.$el.find("#description").val(), { silent: true })
			});

			that.$el.find("#addTodoButton").live('click', function(e) { 
				var $titleField = that.$el.find("#title");
				var $descField = that.$el.find("#description");
				todoApp.instance.todoList.Model.addTodo(new todoApp.TodoModel($titleField.val(), $descField.val()));
				todoApp.instance.todoCreationForm.Model.setTitle("");
				todoApp.instance.todoCreationForm.Model.setDescription("");

				return false;
			});
		};

		function init() {
			if(!model) { throw "model not supplied"; }
			
			that.Model = model;
			var view = _.extend(that, new invertebrate.View());
			$.subscribe("/todoCreationForm/title/", that.render);
			$.subscribe("/todoCreationForm/description/", that.render);
			that.render({ done: that.postRender });
			
			return view;
		}

		return init();
	};
}(todoApp));
