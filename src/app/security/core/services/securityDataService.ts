/// <reference path="../../../../../typings/typescriptapp.d.ts" />

module App.Security {

    "use strict";

    /**
     * @name SecurityDataService
     * @module App.Security
     */
    export class SecurityDataService implements ISecurityDataService {
        
        constructor(private apiEndpoint: Common.IApiEndpointConfig, private dataService: Data.IDataService) {

        }

    }

    angular.module("app.security").service("securityDataService", ["apiEndpoint", "dataService", SecurityDataService]);

} 