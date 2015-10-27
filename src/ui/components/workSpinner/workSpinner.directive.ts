/// <reference path="../../../../typings/typescriptapp.d.ts" />

module App.UI {

    "use strict";

    /**
     * @name WorkSpinner
     * @module App.UI
     * @description work-spinner component interface boundary
     */
    export class WorkSpinner {
        
        constructor() { }

        public static createInstance = () => { return new WorkSpinner(); }

        public restrict: string = "A";

        public template: string = [
            "<ng-transclude ng-show='vm.requestCount'>",
            "</ng-transclude>"
        ].join(" ");

        public controller: string = "workSpinnerController";

        public controllerAs: string = "vm";

        public transclude: string = "element";

    }

    angular.module("app.ui").directive("workSpinner", [WorkSpinner.createInstance]);
} 