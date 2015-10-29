module App.UI {

    "use strict";

    var $q: ng.IQService = <ng.IQService>angular.injector(['ng']).get("$q");

    /**
     * @name setOpacityAsync
     * @module App.UI
     */
    export var setOpacityAsync = (options: any) => {
        var deferred = $q.defer();
        if (options.nativeHtmlElement) {
            options.nativeHtmlElement.style.opacity = options.opacity;
            options.nativeHtmlElement.addEventListener('transitionend', resolve, false);            
        }
        function resolve() {
            options.nativeHtmlElement.removeEventListener('transitionend', resolve);
            deferred.resolve();
        }
        return deferred.promise;          
    }

    angular.module("app.ui").value("setOpacityAsync", setOpacityAsync);
} 