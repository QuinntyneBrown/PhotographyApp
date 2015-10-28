module App.UI {

    "use strict";

    var $q: ng.IQService = <ng.IQService>angular.injector(['ng']).get("$q");

    /**
     * @name extendCssAsync
     * @module App.UI
     */
    export var extendCssAsync = (options: any) => {
        var deferred = $q.defer();
        angular.extend(options.nativeHTMLElement.style, options.cssObject);
        deferred.resolve();
        return deferred.promise;
    }

    angular.module("app.ui").value("extendCssAsync", extendCssAsync);
} 