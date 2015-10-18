/// <reference path="../../../../../typings/typescriptapp.d.ts" />
 
module App.UI {

    export class AppFooter {

        public static createInstance = () => {
            return new AppFooter();
        }

        public templateUrl: string = "src/app/ui/components/appFooter/appFooter.html";

        public restrict: string = "E";

        public replace: boolean = true;

        public controllerAs: string = "vm";

        public controller: string = "appFooterController";

        public link = (scope: ng.IScope, element: ng.IAugmentedJQuery, attributes: ng.IAttributes) => {

        }
    }

    angular.module("app.ui").directive("appFooter", [AppFooter.createInstance]);
}