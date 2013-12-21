(function (invertebrate) {
    "use strict";

    function TemplateUriHelper(configSvc, serverUriSelectionFunc) {

        if (!(this instanceof invertebrate.TemplateUriHelper)) {
            return new invertebrate.TemplateUriHelper(configSvc, serverUriSelectionFunc);
        }

        var that = this,
            _configSvc = null;

        this.serverUriSelectionFunc = function () {
            return "./template-server/";
        };

        this.getTemplateUri = function (templateName) {
            if(!templateName) { throw "templateName not supplied." }

            var templatesUriPart = _configSvc.config.templatesUriPart;
            if(!templatesUriPart) { throw "templatesUriPart empty." }
            var serverUri = that.serverUriSelectionFunc();
            if(!serverUri) { throw "serverUri empty." }

            return "" + serverUri + templatesUriPart + templateName;
        };

        this.getPostRenderScriptUri = function (postRenderScriptName) {
            if(!postRenderScriptName) { throw "postRenderScriptName not supplied." }

            var postRenderScriptsUriPart = _configSvc.config.templatePostRenderScriptsUriPart;
            if(!postRenderScriptsUriPart) { throw "postRenderScriptsUriPart empty." }
            var serverUri = that.serverUriSelectionFunc();
            if(!serverUri) { throw "serverUri empty." }

            return "" + serverUri + postRenderScriptsUriPart + postRenderScriptName;
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
    }

    invertebrate.TemplateUriHelper = TemplateUriHelper;
}(invertebrate));