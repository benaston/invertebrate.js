//a resource can have a template, metadata and a post-render action?
//note 1: meant to be a function to calculate left-part of the uri to point to to retrieve resources
//todo: convert to prototype function binding throughout
(function(invertebrate) {	
	invertebrate.TemplateServerSvc = function(configSvc, serverUriSelectionFunc) {
		"use strict";

		if (!(this instanceof invertebrate.TemplateServerSvc)) {		
			return new invertebrate.TemplateServerSvc(configSvc, serverUriSelectionFunc); 
		}

		var that = this, _configSvc = null, _serverUriSelectionFunc = function() { return "/"; }; //see note 1
		
		that.metadata = {}; //scripts register themselves in here
		
		that.getTemplateUri = function (templateName) {
			var templatesUriPart = that.configSvc.config.templatesUriPart;

			return that.getSearchItemCroniclUri() + templatesUriPart + templateName;
		};

		that.getPostRenderActionScriptUri = function (templateName) {
			var postRenderScriptsUriPart = that.configSvc.config.templatePostRenderScriptsUriPart;

			return that.getSearchItemCroniclUri() + postRenderScriptsUriPart + templateName;
		};

		function getMetadata(options) {
			if(!options) { throw "options not supplied"; }
			if(!options.serverUriSelectionFunc) { throw "serverUriSelectionFunc not supplied"; }
			if(!options.resourceName) { throw "resourceName not supplied"; }
		
			var defaultOptions = {
					done: function(metadata) {},
					fail: function (jqxhr, settings, exception) { console.log(exception); throw exception; }
				}
				options = _.extend({}, that.defaults, options),
				done = function() { return options.done(that.metadata[itemName]); }; //closes over the metadata variable
		
			var metadataUriPart = that.configSvc.config.metadataUriPart,
				uri = serverUriSelectionFunc() + metadataUriPart;

			if (that.metadata && that.metadata[itemName]) {			
				return success(that.metadata[itemName]);
			}

			$.ajax({ url: uri, 
					 type: "GET",
					 dataType: "script", 
					 cache: false }).done(done)
					 				.fail(options.fail);		
		}	

		function init() {						
			if(!configSvc) { throw "configSvc not supplied"; }
			
			that._configSvc = configSvc;
			that._serverUriSelectionFunc = serverUriSelectionFunc ? serverUriSelectionFunc : that._serverUriSelectionFunc;
			
			return that;
		}

		return init();
	};	
}(invertebrate));