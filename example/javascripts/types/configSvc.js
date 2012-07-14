function ConfigSvc(env) {
	"use strict";

	if (!(this instanceof ConfigSvc)) {
		return new ConfigSvc(); 
	}

	var that = this, 
	devConfig = {
		croniclOneUri: "/itcontractor/",
		croniclTwoUri: "/itcontract/",
		wizeratiUri: "/",
	},	
	prodConfig = {
		croniclOneUri: "https://itcontractor.croni.cl/",
		croniclTwoUri: "https://itcontract.croni.cl/",
		wizeratiUri: "https://www.wiz.com/"
	},
	sharedConfig = {
		croniclOneItemName: "itcontractor", //intended for use in creation of local "assoc" arrays
		croniclTwoItemName: "itcontract",
		templatesUriPart: "templates/",
		templatePostRenderScriptsUriPart: "templatePostRenderScripts/",
		metadataUriPart: "config/metadata",
		searchQueryStringUriPart: "?q=",
		bookmarksUriPart: "bookmarks", //lack of trailing slash is intentional for file-based testing
		itemUriPart: "item/"
	},
	envEnum = null;
	
	function init(env, envEnum) {
		that.envEnum = envEnum || wiz.mod("enum").Env;
		
		switch (env) {
		case that.envEnum.dev:
			that.config = _.extend({}, devConfig, sharedConfig);
			break;
		case that.envEnum.prod:
			that.config = _.extend({}, prodConfig, sharedConfig);
			break;
		default:
			throw "invalid environment: " + env;
		}

		return that;
	}

	return init;
}
