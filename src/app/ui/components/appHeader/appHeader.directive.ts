/// <reference path="../../../../../typings/typescriptapp.d.ts" />
 
module App.UI {
    
    export class AppHeader {
        
        public static createInstance = () => {
            return new AppHeader();
        }

        public templateUrl: string = "/src/app/ui/components/appHeader/appHeader.html";

        public restrict: string = "E";

        public replace: boolean = true;

        public scope:any = {
            appHeaderManagerName:"@"
        }

        public controllerAs: string = "vm";

        public controller: string = "appHeaderController";

        public styles: string;

        public link = (scope:ng.IScope, element: ng.IAugmentedJQuery, attributes:ng.IAttributes) => {
            
        }
    }

    angular.module("app.ui").directive("appHeader", [AppHeader.createInstance]);

}