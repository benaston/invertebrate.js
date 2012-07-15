//a resource can have a template, metadata and a post-render action?
//note 1: meant to be a function to calculate left-part of the uri to point to to retrieve resources
function InvertebrateResourceServerSvc(configSvc, serverUriSelectionFunc) {
	"use strict";

	if (!(this instanceof InvertebrateTemplateServerSvc)) {		
		return new InvertebrateTemplateServerSvc(); 
	}

	var that = this, configSvc = null, serverUriSelectionFunc = function() { return "/"; }; //see note 1
	
	
	this.metadata = {}; //scripts register themselves in here
	
	function getResourceMetadata(options) {
		if(!options) { throw "options not supplied"; }
		if(!options.serverUriSelectionFunc) { throw "serverUriSelectionFunc not supplied"; }
		if(!options.resourceName) { throw "resourceName not supplied"; }
		
		var defaultOptions = {
				done: function(metadata) {},
				fail: function (jqxhr, settings, exception) { console.log(exception); throw; }
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
	};
	
	
	this.getTemplateUri = function (templateName) {
		var templatesUriPart = that.configSvc.config.templatesUriPart;

		return that.getSearchItemCroniclUri() + templatesUriPart + templateName;
	};

	this.getPostRenderActionScriptUri = function (templateName) {
		var postRenderScriptsUriPart = that.configSvc.config.templatePostRenderScriptsUriPart;

		return that.getSearchItemCroniclUri() + postRenderScriptsUriPart + templateName;
	};

	function init() {						
		that.configSvc = app.mod("config").ConfigSvc;
		that.serverUriSelectionFunc = serverUriSelectionFunc ? serverUriSelectionFunc : that.serverUriSelectionFunc;
			
		return that;
	}

	return init();
}