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

		return init();
	};
}(invertebrate));
