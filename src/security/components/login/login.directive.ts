module App.Security {

    "use strict";

    /**
     * @name login
     * @module App.Security
     */
    export class Login {

        public static createInstance = () => { return new Login(); }

        public template: string = [""].join(" ");

        public static styleUrls: Array<string> = [];

        public restrict: string = "E";

        public replace: boolean = true;

        public controller: string = "loginController";

        public controllerAs: string = "vm";

    }

    angular.module("app.security").directive("login", [Login.createInstance]);
} 