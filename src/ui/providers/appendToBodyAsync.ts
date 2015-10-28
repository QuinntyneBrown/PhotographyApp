module App.UI {

    "use strict";

    var $q: ng.IQService = <ng.IQService>angular.injector(['ng']).get("$q");

    /**
     * @name appendToBodyAsync
     * @module App.UI
     */
    export var appendToBodyAsync = (options: any) => {
        var deferred = $q.defer();
        document.body.appendChild(options.nativeHTMLElement);
        setTimeout(() => { deferred.resolve(); }, 100);
        return deferred.promise;
    }

    angular.module("app.ui").value("appendToBodyAsync", appendToBodyAsync);
} 