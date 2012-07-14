//responsible for constructing a map of configuration items
//for the specified environment.
function ConfigSvc(env) {
	"use strict";

	if (!(this instanceof ConfigSvc)) {
		return new ConfigSvc(); 
	}

	var that = this, 
	devConfig
		wizeratiUri: "/",
	},	
	prodConfig = {
		wizeratiUri: "http://www.github.com/benaston/invertebrate.js/example/"
	},
	sharedConfig = {
		templatesUriPart: "templates/",
		templatePostRenderScriptsUriPart: "templatePostRenderScripts/",
		metadataUriPart: "config/metadata"
	},
	envEnum = null;
	
	function init(env, envEnum) {
		that.envEnum = envEnum || app.mod("enum").Env;
		
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
