module App.Security {

    "use strict";

    /**
     * @name login
     * @module App.Security
     */
    export class Login {
        constructor() { }

        public static createInstance = () => {
            return new Login();
        }

        public templateUrl: string = "src/app/security/components/login/login.html";

        public restrict: string = "E";

        public replace: boolean = true;

        public controller: string = "loginController";

        public controllerAs: string = "vm";

        public link = (scope: ng.IScope, element: ng.IAugmentedJQuery, attributes: ng.IAttributes) => {

        }
    }

    angular.module("app.security").directive("login", [Login.createInstance]);
} 