/// <reference path="../../../../../typings/typescriptapp.d.ts" />

module App.UI {

    "use strict";

    /**
     * @name Tabs
     * @module App.UI
     */
    export class Tabs {
        constructor() { }

        public static createInstance = () => { return new Tabs(); }

        public restrict: string = "E";

        public replace: boolean = true;

        public static styleUrls: Array<string> = [];

        public template: string = [
            "<div>",
            "<button>Next Tab</button>",
            "</div>"
        ].join(" ");

        public transclude:string = "element";

        public controller: string = "tabsController";

        public controllerAs: string = "vm";

        public compile = (template: ng.IAugmentedJQuery) => {
            return (scope: ng.IScope, element: ng.IAugmentedJQuery, attributes: ng.IAttributes, controller: any, transclude: any) => {
                transclude(scope.$new(), (clone: ng.IAugmentedJQuery) => {
                    
                });
            }
        };

    }

    angular.module("app.ui").directive("tabs", [Tabs.createInstance]);
} 