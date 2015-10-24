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
            "<div ng-transclude='titleSlot'></div>",
            "<div ng-transclude='currenSlot'></div>",
            "</div>"
        ].join(" ");

        public transclude = { tabTitle: 'titleSlot', tabContent: 'contentSlot' };

        public controller: string = "tabsController";

        public controllerAs: string = "vm";

    }

    angular.module("app.ui").directive("tabs", [Tabs.createInstance]);
} 