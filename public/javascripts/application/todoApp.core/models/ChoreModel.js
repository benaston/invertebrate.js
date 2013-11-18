(function (appRoot) {
    "use strict";

    function ChoreModel(id, title, description) {

        if (!(this instanceof appRoot.ChoreModel)) {
            return new appRoot.ChoreModel(id, title, description);
        }

        var that = this;

        function init() {
            if (!id) {
                throw "id not supplied";
            }
            if (!title) {
                throw "title not supplied";
            }
            if (!description) {
                throw "description not supplied";
            }

            that.id = id;
            that.title = title;
            that.description = description;


            return that;
        }

        return init();
    }

    appRoot.ChoreModel = ChoreModel;
    appRoot.invertebrate.Model.isExtendedBy(appRoot.ChoreModel);

}(appRoot));
