module App.Configuration {

    "use strict";

    export class Configuration implements IConfiguration {

        public createInstance = () => {
            var instance = new Configuration();

            return instance;
        }

    }

    angular.module("app.configuration").service("configuration", [Configuration]);

} 