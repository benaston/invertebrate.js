(function (invertebrate, _) {
  'use strict';

  function Config(env) {
    if (!(this instanceof invertebrate.Config)) {
      return new invertebrate.Config(env);
    }

    var envEnum = null;

    this.devConfig = {};
    this.prodConfig = {};
    this.sharedConfig = {};

    //Should be called from types implementing this prototype.
    this.collateConfiguration = function () {
      this.envEnum = envEnum || invertebrate.env;

      switch (env) {
        case this.envEnum.dev:
          this.config = _.extend({}, this.sharedConfig, this.devConfig);
          break;
        case this.envEnum.prod:
          this.config = _.extend({}, this.sharedConfig, this.prodConfig);
          break;
        default:
          throw 'invalid environment: ' + env;
      }

      return this;
    };

    function init() {
      return this;
    }

    return init();
  }

  invertebrate.Config = Config;
}(invertebrate, _));
