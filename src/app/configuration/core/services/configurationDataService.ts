module App.Configuration {

    "use strict";

    /**
     * @name ConfigurationDataService
     * @module App.Configuration
     */
    export class ConfigurationDataService implements IConfigurationDataService {
        
        constructor(private apiEndpointConfig:Common.IApiEndpointConfig, private dataService: Data.IDataService) {
            
        }

    }

    angular.module("app.configuration").service("configurationDataService", ["apiEndpointConfig","dataService",ConfigurationDataService]);

} 