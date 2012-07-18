//a resource can have a template, metadata and a post-render action?
//note 1: meant to be a function to calculate left-part of the uri to point to to retrieve resources
//todo: convert to prototype function binding throughout?
(function(invertebrate) {	
	invertebrate.SyncSvc = function(configSvc, serverUriSelectionFunc) {
		"use strict";

		if (!(this instanceof invertebrate.SyncSvc)) {		
			return new invertebrate.SyncSvc(configSvc, serverUriSelectionFunc); 
		}

		var that = this, _configSvc = null, _syncInterval = null;
		
		this.serverUriSelectionFunc = function() { return "./example/templateServer/"; }; //see note 1
		
		this.metadata = {}; //scripts register themselves in here

		this.sync = function(options) {
			$.publish("sync://syncableModels/"); //review uri
		};
		
		this.start = function() {
			var syncinterval = that._configSvc.syncinterval || 10;

			that._syncInterval = setInterval(function() {
				that.sync();
			}, syncInterval);
		};

		this.stop = function() {
			clearInterval(that._syncInterval);
		};

		function init() {					
			if(!configSvc) { throw "configSvc not supplied"; }
			
			that._configSvc = configSvc;
			that.serverUriSelectionFunc = serverUriSelectionFunc || that.serverUriSelectionFunc;
			
			return that;
		}

		return init();
	};	

}(invertebrate));