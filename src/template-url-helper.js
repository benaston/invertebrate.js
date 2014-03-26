(function (invertebrate) {
  'use strict';

  function TemplateUrlHelper(configSvc, serverUriSelectionFunc) {

    if (!(this instanceof invertebrate.TemplateUrlHelper)) {
      return new invertebrate.TemplateUrlHelper(configSvc, serverUriSelectionFunc);
    }

    var that = this,
        _configSvc = null;

    this.serverUrlSelectionFunc = function () {
      return './template-server/';
    }; //see note 1

    this.getTemplateUri = function (templateName) {
      if (!templateName) {
        throw 'templateName not supplied.';
      }

      var templatesUriPart = _configSvc.config.templatesUriPart;
      if (!templatesUriPart) {
        throw 'templatesUriPart empty.';
      }
      var serverUri = that.serverUrlSelectionFunc();
      if (!serverUri) {
        throw 'serverUri empty.';
      }

      return '' + serverUri + templatesUriPart + templateName;
    };

    this.getPostRenderScriptUri = function (postRenderScriptName) {
      if (!postRenderScriptName) {
        throw 'postRenderScriptName not supplied.';
      }

      var postRenderScriptsUriPart = _configSvc.config.templatePostRenderScriptsUriPart;
      if (!postRenderScriptsUriPart) {
        throw 'postRenderScriptsUriPart empty.';
      }
      var serverUri = that.serverUrlSelectionFunc();
      if (!serverUri) {
        throw 'serverUri empty.';
      }

      return '' + serverUri + postRenderScriptsUriPart + postRenderScriptName;
    };

    function init() {
      if (!configSvc) {
        throw 'configSvc not supplied';
      }

      _configSvc = configSvc;
      that.serverUrlSelectionFunc = serverUriSelectionFunc || that.serverUrlSelectionFunc;

      return that;
    }

    return init();
  }

  invertebrate.TemplateUrlHelper = TemplateUrlHelper;
}(invertebrate));