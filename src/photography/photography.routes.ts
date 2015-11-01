/// <reference path="../../typings/typescriptapp.d.ts" />

module App.Photography {

    "use strict";

    export class PhotographyRoutesRoutes {
        
        public static Configure = ($routeProvider: any) => {

            $routeProvider.when("/", {
                componentName: "homeComponent",
                moduleName:"photography"
            });

            $routeProvider.when("/photos", {                
                componentName: "homeComponent",
                moduleName: "photography"
            });

            $routeProvider.when("/rates", {
                componentName: "ratesComponent",
                moduleName: "photography"
            });
        }
    }

} 