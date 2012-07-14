function App(env) {
	"use strict";

	if (!(this instanceof App)) {
		return new App(); 
	}

	var that = this;
			
	function init() {
		that.env = env;
		
		return _.extend(that, new InvertebrateApp());
	}

	return init();
}