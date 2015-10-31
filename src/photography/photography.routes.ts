/// <reference path="../../typings/typescriptapp.d.ts" />

module App.Photography {

    "use strict";

    export class PhotographyRoutesRoutes {
        
        public static Configure = ($routeProvider: ng.route.IRouteProvider) => {
            Route({
                when: "/",
                componentTemplateUrl: "src/photography/components/home.component.html",
                componentName: "homeComponent",
                $routeProvider: $routeProvider
            });

            Route({
                when: "/photos",
                componentTemplateUrl: "src/photography/components/home.component.html",
                componentName: "homeComponent",
                $routeProvider: $routeProvider
            });

            $routeProvider.when("/rates", {
                templateUrl: "src/photography/components/rates.component.html",
                controller: "ratesComponent",
                controllerAs: "vm",
                resolve: {
                    routeData: ["routeResolverService", (routeResolverService:App.Common.IRouteResolverService) => {
                        return routeResolverService.resolve("/rates");
                    }]
                }
            });
        }
    }

} 