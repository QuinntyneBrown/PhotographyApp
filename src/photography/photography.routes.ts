/// <reference path="../../typings/typescriptapp.d.ts" />

module App.Photography {

    "use strict";

    export class PhotographyRoutes {
        
        public static Configure = ($routeProvider: any) => {

            ngX.Configure({ appModuleName: "photography" });

            $routeProvider
                .when("/", { componentName: "homeComponent" })
                .when("/photos", { componentName: "homeComponent" })
                .when("/rates", { componentName: "ratesComponent" });
        }
    }

} 