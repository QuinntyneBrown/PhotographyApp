/// <reference path="../../../../../typings/typescriptapp.d.ts" />

module App.UI {

    "use strict";

    /**
     * @name TabTitle
     * @module App.UI
     */
    export class TabContent {
        constructor() { }

        public static createInstance = () => { return new TabContent(); }

        public restrict: string = "E";

        public replace: boolean = true;

        public static styleUrls: Array<string> = [];

        public scope: any = {};

        public template: string = [
            "<div>",
            "</div>"
        ].join(" ");


        public controller: string = "tabContentController";

        public controllerAs: string = "vm";

    }

    angular.module("app.ui").directive("tabContent", [TabContent.createInstance]);
} 