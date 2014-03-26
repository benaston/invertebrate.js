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
;(function (invertebrate, _) {
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
;'use strict';

(function (invertebrate) {
  invertebrate.env = {
    dev: '1',
    test: '2',
    prod: '3'
  };
}(invertebrate));
;'use strict';

window.invertebrate = {}; //'namespace' in the global namespace to hang stuff off
;(function (invertebrate) {
  'use strict';

  function Model() {

    if (!(this instanceof invertebrate.Model)) {
      return new invertebrate.Model();
    }

    var that = this;

    that.resourceName = 'not set';

    function init() {
//            $.subscribe('sync://syncableModels/', that.sync);

      return that;
    }

    return init();
  }

  invertebrate.Model = Model;

  invertebrate.Model.prototype.sync = function () {
    //this is a placeholder for future sync functionality
  };

  //todo: refactor off
  invertebrate.Model.isExtendedBy = function (child) {
    child.prototype = new invertebrate.Model();
    child.prototype.constructor = child;
  };
}(invertebrate));
;(function (invertebrate, $, _) {
  'use strict';

  function Router(defaultPageTitle) {

    var that = this,
        _defaultPageTitle = null;

    this.routes = {};

    this.registerRoute = function (uri, action, options) {
      var defaults = { silent: false, title: _defaultPageTitle, uriTransform: function (uri, dto) {
        return uri;
      }, isExternal: false };
      options = _.extend({}, defaults, options);

      that.routes[uri] = { action: action, options: options };
    };

    this.redirect = function (uri, dto, options) {
      that.route(uri, dto, options);
    };

    this.route = function (uri, dto, options) {
      options = options || { silent: false };

      var splitUri = uri.split('?');
      var uriWithoutQueryString = splitUri[0];
      var queryString = splitUri[1] || '';

      var escapedRoute = uriWithoutQueryString.replace(/\//g, '\\/');
      var pattern = new RegExp('^' + escapedRoute, 'g');

      var firstMatchingRouteUri = _.filter(Object.keys(that.routes), function (key) {
        return pattern.exec(key);
      })[0];

      if (!firstMatchingRouteUri) {
        throw 'No matching client-side route "' + uriWithoutQueryString + '". Check your route-registry.';
      }

      var route = that.routes[firstMatchingRouteUri];

      if (!route.options.silent && !options.silent) {
        document.title = route.options.title;
        history.pushState(null, null, route.options.uriTransform(uri, dto));
      }

      if (dto) {
        route.action(dto);

        return;
      }

      var queryStringArguments = queryString.split('&');
      route.action(extractQueryString(queryStringArguments, options.isExternal));
    };

    function routeHyperlink(evt) {
      var href = $(this).attr('href');
      var protocol = 'http//';

      /* jshint -W116 */
      if (href == null) {
        evt.preventDefault();
        return;
      }

      if (href.slice(protocol.length) !== protocol) {
        evt.preventDefault();
        that.route(href);
      }
    }

    function routeFormSubmission(evt) {
      var action = $(this).attr('action');
      var protocol = 'http//';

      if (action.slice(protocol.length) !== protocol) {
        evt.preventDefault();

        that.route(action, that.createDtoFromForm($(this)));
      }
    }

    this.createDtoFromForm = function ($form) {
      var dto = {};
      var $textFields = $form.find('input[type=text],input[type=search],input[type=email],input[type=password],input[type=hidden]');
      _.each($textFields, function ($t) {
        dto[$t.name] = $t.value;
      });

      var $selections = $form.find('input[type=radio]:checked,input[type=checkbox]:checked');
      _.each($selections, function ($r) {
        dto[$r.name] = $r.value;
      });

      return dto;
    };

    function extractQueryString(queryString, isExternal) {
      var dto = {};
      dto.__isInvertebrateExternal__ = isExternal;

      if (queryString === '') {
        return dto;
      }

      for (var i = 0; i < queryString.length; ++i) {
        var p = queryString[i].split('=');
        if (p.length !== 2) continue;
        dto[p[0]] = decodeURIComponent(p[1].replace(/\+/g, ' '));
      }

      return dto;
    }

    function init() {
      if (!defaultPageTitle) {
        throw 'defaultPageTitle not supplied.';
      }

      _defaultPageTitle = defaultPageTitle;

      window.addEventListener('popstate', function (e) {
        that.route(location.pathname + location.search, null, {silent: true, isExternal: true });
      });

      $(document).on('touchstart', 'button', function(){ $(this).addClass('halo'); });
      $(document).on('touchend', 'button', function(){ $(this).removeClass('halo'); });
      $(document).on('click', 'a:not([data-bypass-router])', routeHyperlink);
      $(document).on('submit', 'form', routeFormSubmission);
    }

    init();
  }

  invertebrate.Router = Router;
}(invertebrate, $, _));
;(function (invertebrate, $) {
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
}(invertebrate, $));;(function (invertebrate) {
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
}(invertebrate));;(function (invertebrate) {
  'use strict';

  function View(model) {
    if (!(this instanceof invertebrate.View)) {
      return new invertebrate.View(model);
    }

    var that = this;

    function init() {
      return that;
    }

    return init();
  }

  invertebrate.View = View;

  invertebrate.View.prototype.onDomReady = function () {
  };

  //todo: refactor off
  invertebrate.View.isExtendedBy = function (child) {
    child.prototype = new invertebrate.View();
    child.prototype.constructor = child;
  };
}(invertebrate));