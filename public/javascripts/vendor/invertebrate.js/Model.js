(function (invertebrate) {
    "use strict";

    function Model() {

        if (!(this instanceof invertebrate.Model)) {
            return new invertebrate.Model();
        }

        var that = this;

        that.resourceName = "not set";

        //todo: ensure base constructor is invoked to subscribe to sync notifications
        function init() {
            $.subscribe("sync://syncableModels/", that.sync);

            return that;
        }

        return init();
    }

    invertebrate.Model = Model;

    invertebrate.Model.prototype.sync = function () {
        //this is a placeholder for future sync functionality
    };

    //todo: refactor off
    invertebrate.Model.isExtendedBy = function (child) {
        child.prototype = new invertebrate.Model();
        child.prototype.constructor = child;
    };
}(invertebrate));
