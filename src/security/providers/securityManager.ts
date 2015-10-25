module App.Security {

    "use strict";

    /**
    * @name SecurityManager
    * @module App.Security
    */
    export class SecurityManager implements ISecurityManager {

        constructor() { }

    }

    angular.module("app.security").service("securityManager", ["apiEndpoint", "dataService", SecurityDataService]);
} 