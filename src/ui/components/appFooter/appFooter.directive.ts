/// <reference path="../../../../typings/typescriptapp.d.ts" />
 
module App.UI {

    export class AppFooter {

        public static createInstance = () => { return new AppFooter(); }

        public template: string = [
            "<div class='app-footer'>",
            "</div>"
        ].join(" ");

        public styles: string = "";

        public restrict: string = "E";

        public replace: boolean = true;

        public controllerAs: string = "vm";

        public controller: string = "appFooterController";
    }

    angular.module("app.ui").directive("appFooter", [AppFooter.createInstance]);
}