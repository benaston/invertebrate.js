//responsible for constructing a map of configuration items
//for the specified environment.
function InvertebrateConfig(env) {
	"use strict";

	if (!(this instanceof InvertebrateConfig)) {
		return new InvertebrateConfig(); 
	}

	var envEnum = null;
	
	this.devConfig = {};
	this.prodConfig = {};
	this.sharedConfig = {};
	
	//should be called from types implementing this
	//prototype
	this.collateConfiguration = function() {
		this.envEnum = envEnum || invertebrate.env;
		
		switch (env) {
		case this.envEnum.dev:
			this.config = _.extend({}, this.devConfig, this.sharedConfig);
			break;
		case this.envEnum.prod:
			this.config = _.extend({}, this.prodConfig, this.sharedConfig);
			break;
		default:
			throw "invalid environment: " + env;
		}

		return this;
	}
	
	function init() {
		return this;
	}

	return init();
}
