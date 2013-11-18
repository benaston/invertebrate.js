(function (app) {
    "use strict";

    function GuidFactory() {

        if (!(this instanceof app.GuidFactory)) {
            return new app.GuidFactory();
        }

        var that = this;

        this.create = function () {
            var S4 = function () {
                return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
            };

            return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
        };

        function init() {            

            return that;
        }

        return init();
    }

    app.GuidFactory = GuidFactory;

}(wizerati));
