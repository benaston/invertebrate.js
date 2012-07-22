self.todoApp = {
	mod: function () {
		var mods = {};

		return function (name) {
			if (mods[name]) {
				return mods[name];
			}

			return mods[name] = {};
		};
	}()
};
