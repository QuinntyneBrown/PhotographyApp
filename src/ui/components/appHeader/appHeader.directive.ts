/// <reference path="../../../../typings/typescriptapp.d.ts" />
 
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
            "<div class='app-header'>",
            "<div data-ng-if='vm.isDeskTop()'>",
            "<a href='{{ ::link.url }}' data-ng-repeat='link in vm.links'>{{ ::link.caption }}</a>",
            "</div>",
            "<div data-ng-if='!vm.isDeskTop()'>",
            "<hamburger-button callout callout-templateUrl='vm.getMobileMenuTemplateUrl()'></hamburger-button>",
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