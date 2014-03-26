(function ($) {
  'use strict';

  //`decorator` should be a function accepting arguments `context, done(err, result)`.
  $.decorate = function (decoratee, decorator) {

    var decorated = Object.create(decoratee);

    getAllMethodNames(decoratee).forEach(function (methodName) {
      decorated[methodName] = function decoratorFunction() {
        var args = [].slice.call(arguments, 0);
        var context = createContext(methodName, decoratee, args);

        return decorator(context, function done(err) {
          if (err) {
            throw err;
          }

          return decoratee[methodName].apply(decoratee, args);
        });
      };
    });

    return decorated;
  };

  function createContext(methodName, decoratee, args) {
    return { ctor: decoratee.constructor.name,
      pType: decoratee.prototype,
      objectType: typeof (decoratee),
      methodName: methodName,
      timestamp: new Date().toISOString(),
      args: args.map(function (a) {
        if (typeof a === 'object') {
          try { return JSON.stringify(a); } catch(e) { return '$.decorate::createContext: Unable to stringify arguments.'}
        }

        return a;
      })
    };
  }

  function getAllMethodNames(object) {
    return Object.getOwnPropertyNames(object).filter(function (property) {
      return typeof object[property] === 'function';
    });
  }

}($));
