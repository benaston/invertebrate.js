(function (invertebrate) {
    "use strict";

    //This function object should be the prototype of your application.
    function App(templateServerSvc, logger) {
        if (!(this instanceof invertebrate.App)) {
            return new invertebrate.App(templateServerSvc);
        }

        var that = this,
            _templateServerSvc = null,
            _logger = null,
            _templatePostRenderScripts = {};

        //Implements string-based "namespaces" aka. "modules". Usage example: `myApp.mod('myNameSpace').MyFunctionObject`.
        that.mod = function () {
            var mods = {};

            return function (name) {
                if (mods[name]) {
                    return mods[name];
                }

                return mods[name] = {};
            };
        }();

        //Retrieves a template from the template server based on `templateName`, merges it with `model` and renders to DOM element `$el`. `templateName` should be something like `favorite.html`. The template server service encapsulates the logic for retrieving a template given a name. Options are: `done`, `error`, `postRenderScriptName`. `postRenderScriptName` is the name of a script to run which is given JQuery (`$`) and the rendered element (`$el`).
        that.renderTemplate = function ($el, templateName, model, options) {
            if (!$el) {
                throw "$el not supplied";
            }

            if (!templateName) {
                throw "templateName not supplied";
            }

            if (!model) {
                throw "model not supplied";
            }

            var defaults = {
                done: function ($el) { },
                error: function (jqxhr, settings, exception) {
                    _logger.error(exception);

                    throw exception;
                },
                postRenderScriptName: null
            };
            options = _.extend({}, defaults, options);

            var templateUri = _templateServerSvc.getTemplateUri(templateName);

            fetchTemplate(templateUri, { done: done });

            //Invokes the `onTemplateRetrieved` callback, supplying the model and JQuery. The result is added to `$el`.
            function done(onTemplateRetrieved) {
                $el.html(onTemplateRetrieved({ model: _.clone(model) }, { jQuery: $ }));

                if (options.postRenderScriptName) {
                    var postRenderScriptUri = _templateServerSvc.getPostRenderScriptUri(options.postRenderScriptName);
                    fetchTemplatePostRenderScript(postRenderScriptUri, function (data) {
                        _templatePostRenderScripts[postRenderScriptUri]($, $el);
                        options.done($el); //NOTE: this is in correct location (really)! Purpose: supply $el for possible additional work, like DOM insertion.
                    });
                } else {
                    options.done($el); //complete for when there is no post-render action script
                }
            }
        };


        //Fetches a template from `templateUri`, caches it and supplies to success callback.
        function fetchTemplate(templateUri, options) {
            if (!templateUri) {
                throw "uri not supplied";
            }

            var defaultOptions = {
                    done: function (metadata) { },
                    fail: function (jqxhr, settings, exception) {
                        _logger.error(exception);
                        throw exception;
                    }
                };
            options = _.extend({}, defaultOptions, options);

            var ajaxDoneCallback = function (data) {
                    var template = _.template(data);
                    that.templates[templateUri] = template;
                    options.done(template);
                };

            var ajaxFailCallback = function (res) {
                    _logger.error(res.status);
                };

            that.templates = that.templates || {};

            if (that.templates[templateUri]) {
                return done(that.templates[templateUri]);
            }

            return $.ajax({ url: templateUri, cache: false })
                .done(ajaxDoneCallback)
                .fail(ajaxFailCallback);

            function ajaxDone(data) {

            }
        }

        //Fetches the specified script (from memory if possible) and supplies it to the `done` callback.
        function fetchTemplatePostRenderScript(uri, done) {
            if (!uri) {
                throw "uri not supplied."
            }
            if (!done) {
                throw "done not supplied."
            }

            if (_templatePostRenderScripts[uri]) {
                return done(_templatePostRenderScripts[uri]);
            }

            return $.ajax( { url: uri,
                             dataType: "text",
                             cache: false,
                             success: function (data) {
                                        _templatePostRenderScripts[uri] = eval(data).postRenderScript;
                                       done(data);
                                      }
                            }).fail(function (jqxhr, settings, exception) {
                                        console.log(exception);
                                    });
        }

        function init() {
            if (!templateServerSvc) {
                throw "templateServerSvc not supplied.";
            }
            if (!logger) {
                throw "logger not supplied.";
            }

            _templateServerSvc = templateServerSvc;
            _logger = logger;

            return that;
        }

        return init();
    }

    invertebrate.App = App;
}(invertebrate));