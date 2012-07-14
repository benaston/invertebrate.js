//slave servers provide ui elements, data and/or code to the application
function InvertebrateSlaveServerSvc() {
	"use strict";

	if (!(this instanceof InvertebrateSlaveServerSvc)) {
		return new InvertebrateSlaveServerSvc(); 
	}

	var that = this, authSvc = null, configSvc = null, roleEnum = null, croniclSvc = null;
	
	this.metadata = {}; //scripts register themselves in here
	
	this.getMyItemCroniclUri = function () {
		var role = that.authSvc.getCurrentUserRole();
		switch(role) {
		case that.roleEnum.RoleOne:
		case that.roleEnum.RoleOneGuest:
			return that.configSvc.config.croniclOneUri;
		case that.roleEnum.RoleTwo:
		case that.roleEnum.RoleTwoGuest:
			return that.configSvc.config.croniclTwoUri;
		case that.roleEnum.Stranger:
			return that.configSvc.config.wizeratiUri;
		default:
			throw "invalid role: " + role;
		}
	}

	this.getSearchItemCroniclUri = function () {
		var role = that.authSvc.getCurrentUserRole();
		switch(role) {
			case that.roleEnum.RoleOne:
			case that.roleEnum.RoleOneGuest:
				return that.configSvc.config.croniclTwoUri;
			case that.roleEnum.RoleTwo:
			case that.roleEnum.RoleTwoGuest:
				return that.configSvc.config.croniclOneUri;
			case that.roleEnum.Stranger:
				return that.configSvc.config.wizeratiUri;
			default:
				throw "invalid role: " + role;
		}
	}

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
	
	this.getSearchItemMetadataUri = function () {
		return that.getSearchItemCroniclUri() + that.configSvc.config.metadataUriPart;
	}
	
	this.getTemplateUri = function (templateName) {
		var templatesUriPart = that.configSvc.config.templatesUriPart;

		return that.getSearchItemCroniclUri() + templatesUriPart + templateName;
	}

	this.getPostRenderActionScriptUri = function (templateName) {
		var postRenderScriptsUriPart = that.configSvc.config.templatePostRenderScriptsUriPart;

		return that.getSearchItemCroniclUri() + postRenderScriptsUriPart + templateName;
	}

	function getItemMetadata(success, fail, itemCroniclUriGetter, itemNameGetter) {
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
	}

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
	}

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

	function init(roleEnum, authSvc, configSvc) {
		that.roleEnum = roleEnum || wiz.mod("enum").UserRole;
		that.authSvc = authSvc || wiz.mod("auth").AuthSvc;
		that.configSvc = configSvc || wiz.mod("config").ConfigSvc;

		return that;
	}

	return init;
}