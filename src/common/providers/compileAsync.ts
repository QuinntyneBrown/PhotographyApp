module App.Common {

    "use strict";

    var $q: ng.IQService = <ng.IQService>angular.injector(['ng']).get("$q");
    var $compile: ng.ICompileService = <ng.ICompileService>angular.injector(['ng']).get("$compile");

    /**
     * @name compileAsync
     * @module App.Common
     */
    export var compileAsync = (options: any) => {
        var deferred = $q.defer();        
        options.augmentedJQuery = $compile(options.template)(options.scope);
        deferred.resolve();
        return deferred.promise;
    }

    angular.module("app.common").value("compileAsync", compileAsync);
} 