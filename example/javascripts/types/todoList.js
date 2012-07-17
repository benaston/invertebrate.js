// TODO: CONFIGURE THE ROUTING BEHAVIOR CF BACKBONE INTERCEPTION
(function(app) {	
	app.TodoListModel = function() {
		"use strict";

		if (!(this instanceof app.TodoListModel)) {		
			return new app.TodoListModel(); 
		}

		var that = this;

		// this.RouterPrototype = Backbone.Router.extend({ /* ... */ });

		this.todos = []; //assoc array?
	
		this.addTodo = function(todo) {
			that.todos.push(todo);
			$.publish("/todoList/onAddTodo");
		};

		function init() {

			return that;
		}

		return init();
	};

	app.TodoListView = function(model) {
		"use strict";

		if (!(this instanceof app.TodoListView)) {		
			return new app.TodoListView(model); 
		}

		var that = this, _el = "#todoList", _templateName = null;
	
		this.$el = $(_el);
		
		that.Model = null;
	
		//arse
		this.render = function() {
			that.$el.empty();
			$.each(that.Model.todos, function(index, value) {
				new app.TodoView(value).render( { done: function($el) { that.$el.append($el); } } );
			});
		};
	
		this.postRender = function() {
		
		};

		function init() {
			if(!model) { throw "model not supplied"; }
			
			that.Model = model;
			$.subscribe("/todoList/onAddTodo", that.render);		
			that.render();
		
			return _.extend(that, new invertebrate.View());
		}

		return init();
	};
}(todoApp));

// 
// 
// this.ViewPrototype = Backbone.View.extend({
// 	el: $("<article>").addClass("width320 details panel hasFadeTransition hasHorizontalCollapseTransition"),
// 		
// 	template: "pinnedItemPanel",
// 			
// 	initialize: function () {
// 		var theOther = this;
// 			
// 	},
// 
// 	render: function () {
// 		var theOther = this;
// 		var templateUri = croniclSvc.getTemplateUri(this.template);
// 			
// 		wiz.renderTemplate(theOther.el, templateUri, that, function () {
// 			that.Model.set({isSelectedItem: "false" }, { silent: true })
// 			var item = new ItemDetails()(that.Model.get("item"));
// 			var detailsTemplateUri = croniclSvc.getTemplateUri(item.View.template);
// 			wiz.renderTemplate(theOther.el.find(".itemDetails"), 
// 							   detailsTemplateUri, 
// 							   item, 
// 							   function (el) {
// 							   	$("#pinnedItemPanelsContainer").append(theOther.el);
// 									
// 								//this dance surrounding the hasHorizontalCollapseTransition is required
// 								//to circumvent a limitation of CSS, when multiple classes contribute transitions
// 								//browsers get confused.
// 								setTimeout(function() { theOther.el.addClass("hasHorizontalCollapseTransition").removeClass("horizontallyCollapsed").addClass("fadedIn"); el.addClass("fadedIn"); }, 0);
// 								setTimeout(function() { theOther.el.removeClass("hasHorizontalCollapseTransition") }, 200);
// 									
// 								theOther.postRender();
// 							   }, 
// 							   null);
// 		}, null);
// 			
// 		return this;
// 	},
// 
// 	postRender: function () {
// 		var theOther = this;
// 			
// 	}
// 				
// });
