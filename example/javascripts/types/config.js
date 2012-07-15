//responsible for constructing a map of configuration items
//for the specified environment.
function Config(env) {
	"use strict";

	if (!(this instanceof Config)) {
		return new Config(); 
	}

	var	that = this, 
		devConfig =  {
			wizeratiUri: "/",
			templateServerUris: [ "/templateServer/" ]
		}, 
		prodConfig = {
			wizeratiUri: "http://www.github.com/benaston/invertebrate.js/example/"
		},
		sharedConfig = {
			templatesUriPart: "templates/",
			templatePostRenderScriptsUriPart: "templatePostRenderScripts/",
			metadataUriPart: "config/metadata"
		};
	
	function init() {
			
		var config =  _.extend(that, new InvertebrateConfig(env));
		config.devConfig = devConfig;
		config.prodConfig = prodConfig;
		config.sharedConfig = sharedConfig;		
		config.collateConfiguration();
		
		return config;
	}

	return init();
}
