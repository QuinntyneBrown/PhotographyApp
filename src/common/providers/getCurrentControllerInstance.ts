module App.Common {

    "use strict";

    /**
     * @name getCurrentControllerInstance
     * @module App.Common
     */
    export var getCurrentControllerInstance = () => {
        var nativeElement = <HTMLElement>document.querySelectorAll('[data-ng-view]')[0];
        if (!nativeElement)
            return null;
        return (<any>angular.element(nativeElement).scope()).vm;
    }

    angular.module("app.common").value("getCurrentControllerInstance", getCurrentControllerInstance);
} 