module App.Configuration {

    "use strict";

    export class Configuration implements IConfiguration {

        constructor() { }

    }

    angular.module("app.configuration").service("configuration", [Configuration]);

} 