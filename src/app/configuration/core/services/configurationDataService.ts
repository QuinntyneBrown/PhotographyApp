module App.Configuration {

    "use strict";

    /**
     * @name ConfigurationDataService
     * @module App.Configuration
     */
    export class ConfigurationDataService implements IConfigurationDataService {
        
        constructor(private apiEndpoint:Common.IApiEndpointConfig, private dataService: Data.IDataService) {
            
        }

    }

    angular.module("app.configuration").service("configurationDataService", ["apiEndpoint","dataService",ConfigurationDataService]);

} 