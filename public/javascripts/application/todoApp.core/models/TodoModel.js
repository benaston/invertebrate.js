(function (appRoot) {
	"use strict";

	function TodoModel(title, description, id) {
		if (!(this instanceof appRoot.TodoModel)) {
			return new appRoot.TodoModel(title, description);
		}

		var that = this;

		function init() {
			if (!title) { throw "title not supplied"; }
			if (!description) { throw "description not supplied"; }

			that.title = title;
			that.description = description;
			that.id = id || guidGenerator();

			return that;
		}

		return init();
	}

	appRoot.TodoModel = TodoModel;
    appRoot.invertebrate.Model.isExtendedBy(appRoot.TodoModel);
}(appRoot));
