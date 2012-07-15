//responsible for constructing a map of configuration items
//for the specified environment.
(function(invertebrate) {
	invertebrate.Config = function(env) {
		"use strict";

		if (!(this instanceof invertebrate.Config)) {
			return new invertebrate.Config(env); 
		}

		var envEnum = null;
	
		this.devConfig = {};
		this.prodConfig = {};
		this.sharedConfig = {};
	
		//should be called from types implementing this prototype
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
	};
}(invertebrate));
