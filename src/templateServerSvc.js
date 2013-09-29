//a resource can have a template, metadata and a post-render action?
//note 1: meant to be a function to calculate left-part of the uri to point to to retrieve resources
//todo: convert to prototype function binding throughout?
(function (invertebrate) {
    "use strict";

    function TemplateServerSvc(configSvc, serverUriSelectionFunc) {

        if (!(this instanceof invertebrate.TemplateServerSvc)) {
            return new invertebrate.TemplateServerSvc(configSvc, serverUriSelectionFunc);
        }

        var that = this,
                   _configSvc = null;

        this.serverUriSelectionFunc = function () {
            return "./template-server/";
        }; //see note 1

        this.metadata = {}; //scripts register themselves in here

        this.getMetadata = function (options) {
            if (!options) {
                throw "options not supplied";
            }
            if (!options.serverUriSelectionFunc) {
                throw "serverUriSelectionFunc not supplied";
            }
            if (!options.resourceName) {
                throw "resourceName not supplied";
            }

            var defaultOptions = {
                    done: function (metadata) {
                    },
                    fail: function (jqxhr, settings, exception) {
                        console.log(exception);
                        throw exception;
                    }
                },
                options = _.extend({}, that.defaults, options),
                done = function () {
                    return options.done(that.metadata[itemName]);
                }; //closes over the metadata variable

            var metadataUriPart = _configSvc.config.metadataUriPart,
                uri = serverUriSelectionFunc() + metadataUriPart;

            if (that.metadata && that.metadata[itemName]) {
                return success(that.metadata[itemName]);
            }

            $.ajax({ url: uri,
                type: "GET",
                dataType: "script",
                cache: false }).done(done)
                .fail(options.fail);
        };

        this.getTemplateUri = function (templateName) {
            var templatesUriPart = _configSvc.config.templatesUriPart;

            return that.serverUriSelectionFunc() + templatesUriPart + templateName;
        };

        this.getPostRenderActionScriptUri = function (templateName) {
            var postRenderScriptsUriPart = _configSvc.config.templatePostRenderScriptsUriPart;

            return that.getSearchItemCroniclUri() + postRenderScriptsUriPart + templateName;
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

    invertebrate.TemplateServerSvc = TemplateServerSvc;
}(invertebrate));