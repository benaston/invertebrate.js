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

    //$.publish("sync://syncableModels/"); //review uri
    invertebrate.Model.prototype.sync = function () {
        //persist and fetch from resource uri
        return _.extend(this, new Object(json)); //?!
    };

    //placeholder for method to hydrate object from json e.g. XHR
    invertebrate.Model.prototype.function = function (json) {
        return _.extend(this, new Object(json)); //?!
    };

    invertebrate.Model.prototype.get = function (json) {
        //todo
        console.log('get called');
    };

    invertebrate.Model.prototype.save = function (json) {
        //todo
        console.log('save called. resource name: ' + this.resourceName);
    };

    //'static' method
    invertebrate.Model.isExtendedBy = function (child) {
        child.prototype = new invertebrate.Model();
        child.prototype.constructor = child;
    };
}(invertebrate));
