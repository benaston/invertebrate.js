function App(env) {
	"use strict";

	if (!(this instanceof App)) {
		return new App(); 
	}

	var that = this;
		
	//that.env = "1"; //dev - change manually for now - used by the config service to determine which configuration values to us
	function init() {
		that.env = env;
		return _.extend(that, new InvertebrateApp());
	}

	return init();
}