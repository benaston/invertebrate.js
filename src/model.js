(function(invertebrate) {
	invertebrate.Model = function() {
		"use strict";

		if (!(this instanceof invertebrate.Model)) {
			return new invertebrate.Model(); 
		}

		var that = this;
			
		function init() {
			return that;
		}

		return init();
	};
	
	//'static' method
	invertebrate.Model.isExtendedBy = function(child) {
		child.prototype = new invertebrate.Model();
	};
	
}(invertebrate));
