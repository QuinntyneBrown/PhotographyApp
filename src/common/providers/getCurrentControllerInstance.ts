module App.Common {

    "use strict";

    /**
     * @name getCurrentControllerInstance
     * @module App.Common
     */
    export var getCurrentControllerInstance = () => {
        var nativeHTMLElement = <HTMLElement>document.querySelectorAll('[data-ng-view]')[0];

        if (!nativeHTMLElement)
            return null;

        var scope: any = angular.element(nativeHTMLElement).scope();
        return scope.vm;
    }

    angular.module("app.common").value("getCurrentControllerInstance", getCurrentControllerInstance);
} 