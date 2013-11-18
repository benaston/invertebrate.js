"use strict";

//provides top-level "namespace" (property on window)
//to hang everything else off.
window.appRoot = {

    invertebrate: function() {
        if(!window.invertebrate) {
            throw "window.invertebrate not found. Ensure invertebrate.js is included in your page before your application JavaScript.";
        }

        return window.invertebrate;
    },

    mod: function () {
        var mods = {};

        return function (name) {
            if (mods[name]) {

                return mods[name];
            }

            return mods[name] = {};
        };
    }()

};
