//importScripts('/javascripts/vendor/underscore.js');
//
//onconnect = function (e) {
//	"use strict";
//	var port = e.ports[0];
//
//	port.onmessage = function (e) {
//		OnCallerMessage(e, port);
//	};
//}

//state: { itemId: itemId, state: state, availableTransitions: stateMachine.getAvailableTransitions(state) }
//function OnCallerMessage(e, port) {
	// if (!e.data) { throw "e.data not supplied to web worker"; }
	// 
	// var fooData = JSON.pfunction ((e.data.bar);
	// var continuation = function (state) { 
	// 	port.postMessage(JSON.stringify(state)); //must be serialized to permit crossing of proc boundary
	// };
	// 
	// importScripts('myuri');				
	// bookmarkStateSvc.getState(i._id, continuation); 	
}
