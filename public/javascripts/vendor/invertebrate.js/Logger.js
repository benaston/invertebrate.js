(function (invertebrate) {
    "use strict";

    //This constructor function provides cross-browser-safe logging capability.
    function Logger() {
        if (!(this instanceof invertebrate.Logger)) {
            return new invertebrate.Logger();
        }

        that.trace = function(message) {
            var console = getConsole();
            console.log("TRACE: " + message);
        };

        that.info = function(message) {
            var console = getConsole();
            console.log("INFO: " + message);
        };

        that.warn = function(message) {
            var console = getConsole();
            console.log("WARNING: " + message);
        };

        that.error = function(message) {
            var console = getConsole();
            console.log("ERROR: " + message);
        };

        //The console is not available in the global namespace in Internet Explorer when the development tools are not in use. This compensates for this fact.
        function getConsole() {
            if(!console) {
                return { log : function() {} }
            }

            return console;
        }

        function init() {

            return that;
        }

        return init();
    }

    invertebrate.Logger = Logger;
}(invertebrate));