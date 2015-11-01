/// <reference path="../../typings/typescriptapp.d.ts" />

module App.Photography {

    "use strict";

    export class PhotographyRoutesRoutes {
        
        public static Configure = ($routeProvider: any) => {

            $routeProvider.when("/", {
                componentTemplateUrl: "src/photography/components/home.component.html",
                componentName: "homeComponent"
            });

            $routeProvider.when("/photos", {
                componentTemplateUrl: "src/photography/components/home.component.html",
                componentName: "homeComponent"
            });

            $routeProvider.when("/rates", {
                componentTemplateUrl: "src/photography/components/rates.component.html",
                componentName: "ratesComponent"
            });
        }
    }

} 