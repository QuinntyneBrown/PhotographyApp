module App.Configuration {

    "use strict";

    /**
     * @name ConfigurationDataService
     * @module App.Configuration
     */
    export class ConfigurationDataService implements IConfigurationDataService {
        
        constructor(private apiEndpoint: Common.IApiEndpointConfig, private dataService: Data.IDataService) { }

        public get() { return this.dataService.fromServiceOrCache({ url: this.baseUri + "/configuration", method: "GET" }); }

        public get baseUri() { return this.apiEndpoint.getBaseUrl("configuration"); }
    }

    angular.module("app.configuration").service("configurationDataService", ["apiEndpoint","dataService",ConfigurationDataService]);

} 