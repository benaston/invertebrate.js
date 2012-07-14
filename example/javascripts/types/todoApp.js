function TodoApp() {
	"use strict";

	if (!(this instanceof TodoApp)) {
		return new TodoApp(); 
	}

	var that = this;
		
	function init() {
	
		return _.extend(that, new InvertebrateApp());
	}

	return init();
}