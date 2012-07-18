// TODO: CONFIGURE THE ROUTING BEHAVIOR CF BACKBONE INTERCEPTION
(function(app) {	
	app.TodoListModel = function() {
		"use strict";

		if (!(this instanceof app.TodoListModel)) {
			return new app.TodoListModel();
		}

		var that = this;
		
		this.updateEventUri = "update://todoList/";
		this.deleteEventUri = "delete://todoList/";
		this.todos = [];
	
		this.addTodo = function(todo, options) {
			if(!todo) { throw "todo not supplied"; }
			options = options || { silent:false };

			that.todos.push(todo);
			if(options.silent === true) { return; }

			$.publish(that.updateEventUri);
		};

		this.removeTodo = function(id, options) {
			if(!id) { throw "id not supplied"; }
			options = options || { silent:false };

			that.todos = _.filter(that.todos, function(i) { return i.id !== id});
			if(options.silent === true) { return; }

			$.publish(that.deleteEventUri);
		};

		this.changeTodoPriority = function(id, delta, options) {
			if(!id) { throw "id not supplied"; }
			if(!delta) { throw "delta not supplied"; }
			options = options || { silent:false };

			var todo = _.filter(that.todos, function(i) { return i.id === id})[0];
			var sourceIndex = _.indexOf(that.todos, todo);
			var targetIndex = sourceIndex-delta;

			if(targetIndex < that.todos.length) {
				that.todos.move(sourceIndex, sourceIndex-delta);
			}

			if(options && options.silent === true) { return; }

			$.publish(that.updateEventUri);
		};

		function init() {
			return _.extend(that, new invertebrate.Model());
		}

		return init();
	};
	
	invertebrate.Model.isExtendedBy(app.TodoListModel);

	app.TodoListView = function(model) {
		"use strict";
		
		if (!(this instanceof app.TodoListView)) {
			return new app.TodoListView(model);
		}

		var that = this, 
			_el = "#todoList",
			_templateName = null;
	
		this.$el = $(_el);
		that.Model = null;
	
		this.render = function(e, options) {
			options = options || { done: that.postRender };
			
			that.$el.empty();
			$.each(that.Model.todos, function(index, value) {
				new app.TodoView(value).render( { done: function($el) { that.$el.append($el); options.done(); } } );
			});
		};
	
		this.postRender = function() {
		};

		function init() {
			if(!model) { throw "model not supplied"; }

			that.Model = model;
			$.subscribe(that.Model.updateEventUri, that.render);
			$.subscribe(that.Model.deleteEventUri, that.render);
			that.render();

			return that;
		}

		return init();
	};

	invertebrate.View.isExtendedBy(app.TodoListView);
}(todoApp));