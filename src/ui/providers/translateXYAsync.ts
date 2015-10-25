/// <reference path="../../../typings/typescriptapp.d.ts" />

module App.UI {

    "use strict";

    var $q: ng.IQService = <ng.IQService>angular.injector(['ng']).get("$q");

    export var translateXYAsync = (options: any) => {

        var deferred = $q.defer();

        options.element.addEventListener('transitionend', () => {
            deferred.resolve();
        }, false);

        angular.element(options.element).css({
            "-moz-transform": "translate(" + options.x + "px, " + options.y + "px)",
            "-webkit-transform": "translate(" + options.x + "px, " + options.y + "px)",
            "-ms-transform": "translate(" + options.x + "px, " + options.y + "px)",
            "-transform": "translate(" + options.x + "px, " + options.y + "px)"
        });

        return deferred.promise;

    };

    angular.module("app.ui").value("translateXYAsync", translateXYAsync);
}  