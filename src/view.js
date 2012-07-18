(function(invertebrate) {
	invertebrate.View = function(model) {
		"use strict";

		if (!(this instanceof invertebrate.View)) {
			return new invertebrate.View(model); 
		}

		var that = this;
			
		function init() {
			return that;
		}
		
		this.arse = function() {
			console.log('arse');
		};

		return init();
	};
	
	//static method
	invertebrate.View.isExtendedBy = function(child) {
		child.prototype = new invertebrate.View();
	};

}(invertebrate));
