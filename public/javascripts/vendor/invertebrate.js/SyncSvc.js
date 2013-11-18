(function (invertebrate) {
    "use strict";

    function SyncSvc(configSvc, serverUriSelectionFunc) {

        if (!(this instanceof invertebrate.SyncSvc)) {
            return new invertebrate.SyncSvc(configSvc, serverUriSelectionFunc);
        }

        var that = this,
            _configSvc = null,
            _syncInterval = null;

        this.serverUriSelectionFunc = function () {
            return "./example/templateServer/";
        }; //see note 1

        this.metadata = {}; //scripts register themselves in here

        this.sync = function (options) {
            $.publish("sync://syncableModels/"); //review uri
        };

        this.start = function () {
            var syncInterval = _configSvc.syncInterval || 10000;

            _syncInterval = setInterval(function () {
                that.sync(null);
            }, syncInterval);
        };

        this.stop = function () {
            clearInterval(_syncInterval);
        };

        function init() {
            if (!configSvc) {
                throw "configSvc not supplied";
            }

            _configSvc = configSvc;
            that.serverUriSelectionFunc = serverUriSelectionFunc || that.serverUriSelectionFunc;

            return that;
        }

        return init();
    };

    invertebrate.SyncSvc = SyncSvc;
}(invertebrate));