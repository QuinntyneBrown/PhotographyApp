/// <reference path="../../../../typings/typescriptapp.d.ts" />

module App.UI {

    "use strict";

    /**
     * @name TabTitle
     * @module App.UI
     */
    export class TabTitle {
        constructor() { }

        public static createInstance = () => { return new TabTitle(); }

        public restrict: string = "E";

        public replace: boolean = true;

        public static styleUrls: Array<string> = [];

        public scope: any = { };

        public template: string = [
            "<h1>",
            "{{ ::vm.title }}",
            "</h1>"
        ].join(" ");


        public controller: string = "tabTitleController";

        public controllerAs: string = "vm";

    }

    angular.module("app.ui").directive("tabTitle", [TabTitle.createInstance]);
} 