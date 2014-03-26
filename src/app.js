(function (invertebrate, $, _, moment) {
  'use strict';

  function App(templateUrlHelper) {
    if (!(this instanceof invertebrate.App)) {
      return new invertebrate.App(templateUrlHelper);
    }

    var that = this,
        _templateServerSvc = null,
        _templates = {},
        _templatePostRenderScripts = {},
        _inFlightRequests = {};

    //implements trivial string-based modularisation
    this.mod = function () {
      var mods = {};

      return function (name) {
        if (mods[name]) {
          return mods[name];
        }

        return mods[name] = {};
      };
    }();

    this.fetchTemplate = function (uri, options) {
      var defaultOptions = {
        done: function (data) {
        },
        fail: function (jqxhr) {
          throw 'fetchTemplate failed. Ensure the TemplateUrlHelper in your application has been instantiated correctly. ' + jqxhr.status;
        }
      };

      options = _.extend({}, defaultOptions, options);

      //attempt to solve issue of sending off many requests for the same template before first request has returned
      var cacheCheckingInterval = 20; //ms
      if (_inFlightRequests[uri]) {
        setTimeout(function checkCacheForTemplate() {
          if (_templates[uri]) {
            return options.done(_templates[uri]);
          } else {
            setTimeout(checkCacheForTemplate, cacheCheckingInterval);
          }
        }, cacheCheckingInterval);
        /*impact on frame-rate is currently unknown*/

        return;
        /*critical*/
      }

      if (_templates[uri]) {
        return options.done(_templates[uri]);
      }

      _inFlightRequests[uri] = 'inFlight';
      return $.ajax({ url: uri, cache: false })
          .done(function (data) {
            delete _inFlightRequests[uri];
            var t = _.template(data); //Templatization step.
            _templates[uri] = t;
            options.done(t);
          })
          .fail(options.fail);
    };

    this.fetchTemplateLocal = function (uri, options) {
      var defaultOptions = {
        done: function (data) {
        },
        fail: function (jqxhr) {
          throw 'fetchTemplateLocal failed.' + jqxhr.status;
        }
      };

      options = _.extend({}, defaultOptions, options);

      if (_templates[uri]) {
        return options.done(_templates[uri]);
      }

      var templateMarkup = $('script[type="text/template"][data-template-uri="' + uri + '"]').html();

      if (!$.trim(templateMarkup)) {
        throw 'Local template "' + uri + '" is empty.';
      }

      var template = _.template(templateMarkup)
      _templates[uri] = template;
      options.done(template);
    };

    this.renderTemplate = function ($el, templateName, model, options) {
      var defaults = {
        done: function ($el) {
        },
        error: function (jqxhr, settings, exception) {
          console.log(exception);
          throw exception;
        },
        postRenderActionScriptUri: null
      };
      options = _.extend({}, defaults, options);

      if (!$el) {
        throw '$el1 not supplied';
      }
      if (!model) {
        throw 'model not supplied';
      }

      var templateUri = _templateServerSvc.getTemplateUri(templateName);

      if (templateName.match(/-local$/g)) {
        that.fetchTemplateLocal(templateUri, { done: done });
      } else {
        //could modify to use self cache
        that.fetchTemplate(templateUri, { done: done });
      }

      function done(tmpl) {
        $el.html(tmpl({ model: _.clone(model), $: $, moment: moment }));

        if (options.postRenderScriptName) {
          var postRenderScriptUri = _templateServerSvc.getPostRenderScriptUri(options.postRenderScriptName);
          that.fetchTemplatePostRenderScript(postRenderScriptUri, function (data) {
            _templatePostRenderScripts[postRenderScriptUri]($, $el);
            options.done($el); //NOTE: this is in correct location (really)! Purpose: supply $el1 for possible additional work, like dom insertion
          });
        } else {
          options.done($el); //complete for when there is no post-render action script
        }
      }
    };

    //invoked by this.renderTemplate if a post-render action script is specified.
    this.fetchTemplatePostRenderScript = function (uri, done) {
      if (!uri) {
        throw 'uri not supplied.';
      }
      if (!done) {
        throw 'done not supplied.';
      }

      if (_templatePostRenderScripts[uri]) {
        return done(_templatePostRenderScripts[uri]);
      }

      return $.ajax({url: uri, dataType: 'text', cache: false, success: function (data, textStatus, jqXHR) {
        _templatePostRenderScripts[uri] = eval(data).postRenderScript; //use Function
        done(data);
      }}).fail(function (jqxhr, settings, exception) {
            console.log(exception);
          });
    };

    function init() {
      if (!templateUrlHelper) {
        throw 'templateUrlHelper not supplied';
      }

      _templateServerSvc = templateUrlHelper;
      return that;
    }

    return init();
  }

  invertebrate.App = App;
}(invertebrate, $, _, moment));
