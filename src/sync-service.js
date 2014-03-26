(function (invertebrate, $) {
  'use strict';

  function SyncService(configService, serverUrlSelectionFunc) {

    if (!(this instanceof invertebrate.SyncService)) {
      return new invertebrate.SyncService(configService, serverUrlSelectionFunc);
    }

    var that = this,
        _configSvc = null,
        _syncInterval = null;

    this.serverUrlSelectionFunc = function () {
      return './example/templateServer/';
    };

    this.sync = function (options) {
      //...
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
      if (!configService) {
        throw 'configSvc not supplied';
      }

      _configSvc = configService;
      that.serverUrlSelectionFunc = serverUrlSelectionFunc || that.serverUrlSelectionFunc;

      return that;
    }

    return init();
  }

  invertebrate.SyncService = SyncService;
}(invertebrate, $));