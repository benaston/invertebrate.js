(function (invertebrate) {
    "use strict";

    function App(templateServerSvc) {
        if (!(this instanceof invertebrate.App)) {
            return new invertebrate.App(templateServerSvc);
        }

        var that = this,
            _templateServerSvc = null;

        //implements trivial string-based modularisation
        that.mod = function () {
            var mods = {};

            return function (name) {
                if (mods[name]) {
                    return mods[name];
                }

                return mods[name] = {};
            };
        }();

        //todo consider wizerati metadata implementation

        //fetches a template from a URI, adds to 'public'
        //templates collection and supplies to success callback
        that.fetchTemplate = function (uri, options) {
            if (!options) {
                throw "options not supplied";
            }

            var defaultOptions = {
                    done: function (metadata) {
                    },
                    fail: function (jqxhr, settings, exception) {
                        console.log(exception);
                        throw exception;
                    }
                },
                done = options.done, //function () { return options.done(that.metadata[uri]); }; //closes over the metadata variable
                ajaxDoneCallback = function (data) {
                    var tmpl = _.template(data);
                    that.templates[uri] = tmpl;
                    done(tmpl);
                },
                ajaxFailCallback = function (jqxhr, settings, exception) {
                    console.log(jqxhr.status);
                };

            options = _.extend({}, defaultOptions, options);
            that.templates = that.templates || {};

            if (that.templates[uri]) {
                return done(that.templates[uri]);
            }

            return $.ajax({ url: uri, cache: false })
                .done(ajaxDoneCallback)
                .fail(ajaxFailCallback);
        };

        that.fetchTemplatePostRenderAction = function (uri, done) {
            self.templatePostRenderActions = self.templatePostRenderActions || {};

            if (templatePostRenderActions[uri]) {
                return done(templatePostRenderActions[uri]);
            }

            return $.ajax({url: uri, dataType: "script", cache: false, done: function (data, textStatus, jqXHR) {
                templatePostRenderActions[uri] = data;
                done(data);
            }}).fail(function (jqxhr, settings, exception) {
                    console.log(exception);
                });
        };

        that.renderTemplate = function ($el, templateName, model, options) {
            var defaults = {
                done: function ($el) {
                },
                error: function (jqxhr, settings, exception) {
                    console.log(exception);
                    throw exception;
                },
                postRenderActionScriptUri: null };
            options = _.extend({}, defaults, options);

            if (!$el) {
                throw "$el not supplied";
            }
            if (!model) {
                throw "model not supplied";
            }

            var templateUri = _templateServerSvc.getTemplateUri(templateName);
            //could modify to use self cache
            that.fetchTemplate(templateUri, { done: function (tmpl) {
                $el.html(tmpl({ model: _.clone(model) }, { jQuery: $ }));
                if (options.postRenderActionScriptUri) {
                    app.fetchTemplatePostRenderAction(postRenderActionScriptUri, function (data) {
                        //need to reference postrenderaction by type/template to ensure correct addressing
                        var postRenderActionLeftPart = _.str.words(options.postRenderActionScriptUri, '/')[0];
                        app.mod("ui").PostRenderActions[postRenderActionLeftPart + "/" + templateName](view);
                        options.done($el); //supply $el for posssible additional work, like dom insertion
                    });
                } else {
                    options.done($el); //complete for when there is no post-render action script
                }
            }});
        };

        function init() {
            if (!templateServerSvc) {
                throw "templateServerSvc not supplied";
            }

            _templateServerSvc = templateServerSvc;

            return that;
        }

        return init();
    }

    invertebrate.App = App;
}(invertebrate));
