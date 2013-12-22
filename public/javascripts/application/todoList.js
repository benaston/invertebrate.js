"use strict";

//provides top-level "namespace" (property on window)
//to hang everything else off.
window.todoList = {

    //Implements string-based "namespaces" aka. "modules". Usage example: `myApp.mod('myNameSpace').MyFunctionObject`. NOTE: referring to the function on the invertebrate App constructor function is experimental.
    mod: invertebrate.App.mod

};
