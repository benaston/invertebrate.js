(function (invertebrate, $, _) {
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
