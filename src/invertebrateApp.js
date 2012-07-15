function InvertebrateApp() {
	"use strict";

	if (!(this instanceof InvertebrateApp)) {
		return new InvertebrateApp(); 
	}

	var that = this;

	//implements trivial string-based namespacing
	that.mod = function() {
		var mods = {};

		return function(name) {
			if (mods[name]) {
				return mods[name];
			}

			return mods[name] = {};
		};
	}();
	
	//fetches a template from a URI, adds to 'public' 
	//templates collection and supplies to success callback		
	that.fetchTemplate = function(uri, done) {				
		if (!options) { throw "options not supplied"; }
		if (!options.serverUriSelectionFunc) { throw "serverUriSelectionFunc not supplied"; }
		if (!options.resourceName) { throw "resourceName not supplied"; }
		
		var defaultOptions = {
				done: function(metadata) {},
				fail: function (jqxhr, settings, exception) { console.log(exception); throw; }
			}
			options = _.extend({}, that.defaults, options),
			done = function() { return options.done(that.metadata[itemName]); }; //closes over the metadata variable
		
		that.templates = that.templates || {};

		if (templates[uri]) {
			return done(templates[uri]);
		}

		return $.ajax({ url: uri, done: function(data){
			var tmpl = _.template(data);
			templates[uri] = tmpl;
			done(tmpl);
		}, cache: false });
	};
	
	that.fetchTemplatePostRenderAction = function(uri, done) {
		self.templatePostRenderActions = self.templatePostRenderActions || {};

		if (templatePostRenderActions[uri]) {
		  return done(templatePostRenderActions[uri]);
		}

		return $.ajax({url: uri, dataType: "script", cache: false, done: function(data, textStatus, jqXHR) {
			templatePostRenderActions[uri] = data;
			done(data);
			}}).fail(function(jqxhr, settings, exception) {
			console.log(exception);
		});
	};
	
	that.renderTemplateRemote = function($el, templateUri, model, templateName, done, postRenderActionScriptUri) {
		var defaults = {
				filterModel: null,
				done: null,
				error: function (e) { throw "runSearch error: " + e; }
		};
		for(var index in defaults) {
			if(!options[index]) options[index] = defaults[index];
		}
		
		if(!$el) { throw "$el not supplied"; }
		if(!templateUri) { throw "templateUri not supplied"; }
		
		//could modify to use self cache
		wiz.fetchTemplate(templateUri, function(tmpl) {
			$el.html(tmpl({ model: model.toJSON() }, { jQuery: $ }));
			if(postRenderActionScriptUri) {
				app.fetchTemplatePostRenderAction(postRenderActionScriptUri, function(data) {
					//need to reference postrenderaction by type/template to ensure correct addressing
					var postRenderActionLeftPart = _.str.words(postRenderActionScriptUri, '/')[0];
					app.mod("ui").PostRenderActions[postRenderActionLeftPart + "/" + templateName](view);
					done($el); //supply $el for posssible additional work, like dom insertion
				});
			}
			else {
				if(done) {
					done($el); //complete for when there is no post-render action script
				}
			}
		});
	};
		
	function init() {
	
		return that;
	}

	return init();
}
