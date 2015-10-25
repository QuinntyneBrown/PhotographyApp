/// <reference path="../../../../../typings/typescriptapp.d.ts" />
 
module App.UI {

    "use strict";

    /**
     * @name AppHeader
     * @module App.UI
     */
    export class AppHeader {
        
        public static createInstance = () => { return new AppHeader(); }

        public static styles: string;

        public template: string = [
            "<div>",
            "<div>",
            "<a data-ng-repeat='link in vm.links'>",
            "{{ ::link.caption }",
            "}",
            "</a>",
            "</div>",
            "</div>"
        ].join(" ");

        public restrict: string = "E";

        public replace: boolean = true;

        public scope:any = {};

        public controllerAs: string = "vm";

        public controller: string = "appHeaderController";

        
    }

    angular.module("app.ui").directive("appHeader", [AppHeader.createInstance]);

}