//a resource can have a template, metadata and a post-render action?
function InvertebrateResourceServerSvc(options) {
	"use strict";

	if (!(this instanceof InvertebrateTemplateServerSvc)) {
		return new InvertebrateTemplateServerSvc(); 
	}

	var that = this, serverUriSelectionFunc = null, configSvc = null;
	
	this.metadata = {}; //scripts register themselves in here
	
	this.getMyItemMetadata = function (success, fail) {
		return getItemMetadata(success, 
							   fail, 
							   that.getMyItemCroniclUri, 
							   getMyItemName);
		
	};

	this.getSearchItemMetadata = function (success, fail) {
		return getItemMetadata(success, 
							   fail, 
							   that.getSearchItemCroniclUri, 
							   getSearchItemName);
	};
	
	function getTemplateMetadata(success, fail, serverUriSelectionFunc, itemNameGetter) {
		var metadataUriPart = that.configSvc.config.metadataUriPart,
		uri = itemCroniclUriGetter() + metadataUriPart,
		role = that.authSvc.getCurrentUserRole(),
		itemName = itemNameGetter();

		if (that.metadata && that.metadata[itemName]) {
			return success(that.metadata[itemName]);
		}

		$.ajax({ url: uri, 
				 dataType: "script", 
				 cache: false, 
				 success: function (data, textStatus, jqXHR) {
					 success(that.metadata[itemName]);
				 } 
			 	}).fail(function (jqxhr, settings, exception) { throw exception; });
	};
	
	
	this.getSearchItemMetadataUri = function () {
		return that.getSearchItemCroniclUri() + that.configSvc.config.metadataUriPart;
	};
	
	this.getTemplateUri = function (templateName) {
		var templatesUriPart = that.configSvc.config.templatesUriPart;

		return that.getSearchItemCroniclUri() + templatesUriPart + templateName;
	};

	this.getPostRenderActionScriptUri = function (templateName) {
		var postRenderScriptsUriPart = that.configSvc.config.templatePostRenderScriptsUriPart;

		return that.getSearchItemCroniclUri() + postRenderScriptsUriPart + templateName;
	};


	function getMyItemName() {
		var role = that.authSvc.getCurrentUserRole();
		switch(role) {
		case that.roleEnum.RoleOne:
		case that.roleEnum.RoleOneGuest:
			return that.configSvc.config.croniclOneItemName;
		case that.roleEnum.RoleTwo:
		case that.roleEnum.RoleTwoGuest:
			return that.configSvc.config.croniclTwoItemName;
		default:
			throw "invalid role: " + role;
		}
	};

	function getSearchItemName() {
		var role = that.authSvc.getCurrentUserRole();
		switch(role) {
		case that.roleEnum.RoleOne:
		case that.roleEnum.RoleOneGuest:
			return that.configSvc.config.croniclTwoItemName;
		case that.roleEnum.RoleTwo:
		case that.roleEnum.RoleTwoGuest:
			return that.configSvc.config.croniclOneItemName;
		default:
			throw "invalid role: " + role;
		}
	}

	//serverSelector meant to be a function to calculate left-part of the uri to point to
	function init() {		
		var defaults = {
			configSvc: app.mod("config").ConfigSvc		
			serverUriSelectionFunc: function() { return "/"; },
		};
		for(var index in defaults) {
			if(!options[index]) options[index] = defaults[index];
		}
		
		that.configSvc = options.configSvc;
		that.serverUriSelectionFunc = options.serverUriSelectionFunc;
		
		return that;
	}

	return init();
}