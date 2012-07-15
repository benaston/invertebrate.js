function TodoModel() {
	"use strict";

	if (!(this instanceof TodoModel)) {
		
		return new TodoModel(); 
	}

	var that = this;

	that.title = "";
	
	that.isDone = false;
	
	that.description = "";
	

	function init() {

		return that;
	}

	return init;
}

function TodoView(model) {
	"use strict";

	if (!(this instanceof TodoView)) {
		
		return new TodoView(); 
	}

	var that = this, el = "<li class='todo></li>", templateName = "todo";
	
	that.$el = $(that.el);
	
	that.render = function() {		
		//WIP!
		//el, templateUri, uiComponent, done, postRenderActionScriptUri
		app.renderTemplate(that.el, constructTemplateUri(), that.Model, templateName, function () {
			
		}, null);
	};
	
	that.postRender = function() {
		
	};

	function init() {

		return _.extend(that, new InvertebrateView());
	}

	return init();
}