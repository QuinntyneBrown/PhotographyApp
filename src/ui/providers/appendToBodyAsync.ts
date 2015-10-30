module App.UI {

    "use strict";

    var $q: ng.IQService = <ng.IQService>angular.injector(['ng']).get("$q");

    /**
     * @name appendToBodyAsync
     * @module App.UI
     */
    export var appendToBodyAsync: IAppendToBodyAsync = (options: IAppendToBodyAsyncOptions) => {
        var deferred = $q.defer();
        document.body.appendChild(options.nativeElement);
        setTimeout(() => { deferred.resolve(); }, options.wait || 100);
        return deferred.promise;
    }

    angular.module("app.ui").value("appendToBodyAsync", appendToBodyAsync);
} 