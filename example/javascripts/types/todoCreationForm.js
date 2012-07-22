(function (app) {
	function TodoCreationFormModel() {
		"use strict";

		if (!(this instanceof app.TodoCreationFormModel)) {
			return new app.TodoCreationFormModel(); 
		}

		var that = this, 
		    _title = null, 
			_description = null;

		this.updateEventUri = "update://todoCreationForm/";

		this.setTitle = function (value, options) {
			options = options || { silent:false };
			
			that._title = value;

			if (options && options.silent === true) { return; }
			
			$.publish(that.updateEventUri);
		};
		
		this.setDescription = function (value, options) {
			that._description = value;

			if (options && options.silent === true) { return; }

			$.publish(that.updateEventUri);
		};

		function init() {
			return that;
		}

		return init();
	};

	app.TodoCreationFormModel = TodoCreationFormModel;
	invertebrate.Model.isExtendedBy(app.TodoCreationFormModel);

	function TodoCreationFormView(model) {
		"use strict";

		if (!(this instanceof app.TodoCreationFormView)) {
			return new app.TodoCreationFormView(model);
		}

		var that = this, 
			_el = "#todoCreationForm", 
			_templateName = "todoCreationForm";

		this.$el = $(_el);
		this.Model = null;
	
		this.render = function (options) {
			options = options || { done: that.postRender };

			return app.instance.renderTemplate(that.$el, _templateName, that.Model, options);
		};
	
		this.postRender = function () {
			var $title = that.$el.find(".title");
			$title.live('change', function () {
				that.Model.setTitle($title.val(), { silent: true });
			});

			var $description = that.$el.find(".description");
			$description.live('change', function () {
				that.Model.setDescription($description.val(), { silent: true })
			});

			var $addTodoButton = that.$el.find(".addTodoButton");
			$addTodoButton.live('click', function (e) { 
				todoApp.instance.todoList.Model.addTodo(new todoApp.TodoModel(that.$el.find(".title").val(), that.$el.find(".description").val()));
				todoApp.instance.todoCreationForm.Model.setTitle("");
				todoApp.instance.todoCreationForm.Model.setDescription("");

				return false;
			});
			
			var $addChoreButton = that.$el.find(".addChoreButton");
			$addChoreButton.live('click', function (e) { 
				todoApp.instance.todoList.Model.addTodo(new todoApp.ChoreModel(that.$el.find(".title").val(), that.$el.find(".description").val()));
				todoApp.instance.todoCreationForm.Model.setTitle("");
				todoApp.instance.todoCreationForm.Model.setDescription("");

				return false;
			});
			
		};

		function init() {
			if (!model) { throw "model not supplied"; }
			
			that.Model = model;
			var view = _.extend(that, new invertebrate.View());
			$.subscribe(that.Model.updateEventUri, that.render);
			that.render();
			
			return view;
		}

		return init();
	};

	app.TodoCreationFormView = TodoCreationFormView;
	invertebrate.View.isExtendedBy(app.TodoCreationFormView);
}(todoApp));
