(function (appRoot) {
	function TodoCreationFormModel() {
		"use strict";

		if (!(this instanceof appRoot.TodoCreationFormModel)) {
			return new appRoot.TodoCreationFormModel(); 
		}

		var that = this, 
		    _title = null, 
			_description = null;

		this.updateEventUri = "update://TodoCreationFormModel/";

		this.setTitle = function (value, options) {
			options = options || { silent:false };
			
			_title = value;

			if (options && options.silent === true) { return; }
			
			$.publish(that.updateEventUri);
		};
		
		this.setDescription = function (value, options) {
			_description = value;

			if (options && options.silent === true) { return; }

			$.publish(that.updateEventUri);
		};

		function init() {
			return that;
		}

		return init();
	}

	appRoot.TodoCreationFormModel = TodoCreationFormModel;
    appRoot.invertebrate.Model.isExtendedBy(appRoot.TodoCreationFormModel);
}(appRoot));
