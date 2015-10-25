/// <reference path="../../../typings/typescriptapp.d.ts" />

module App.UI {

    "use strict";

    var $q: ng.IQService = <ng.IQService>angular.injector(['ng']).get("$q");

    export var translateXAsync: ITranslateXAsync = (options: any) => {

        var deferred = $q.defer();

        angular.element(options.element).css({
            "-moz-transform": "translateX(" + options.x + "px)",
            "-webkit-transform": "translateX(" + options.x + "px)",
            "-ms-transform": "translateX(" + options.x + "px)",
            "-transform": "translateX(" + options.x + "px)"
        });

        options.element.addEventListener('transitionend', () => {
            deferred.resolve();
        }, false);

        return deferred.promise;

    };

    angular.module("app.ui").value("translateXAsync", translateXAsync);
}  