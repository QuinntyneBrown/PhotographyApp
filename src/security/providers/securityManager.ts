module App.Security {

    "use strict";

    /**
    * @name SecurityManager
    * @module App.Security
    */
    export class SecurityManager implements ISecurityManager {

        constructor(private localStorageService: Common.ILocalStorageService) { }

    }

    angular.module("app.security").service("securityManager", ["localStorageService", SecurityDataService]);
} 