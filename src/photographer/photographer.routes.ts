/// <reference path="../../typings/typescriptapp.d.ts" />

module App.Photographer {

    "use strict";

    export class PhotographerRoutes {
        
        public static Configure = ($routeProvider: ng.route.IRouteProvider) => {
            $routeProvider.when("/about", {
                templateUrl: "src/photography/components/home/home.html",
                controller: "homeController",
                controllerAs: "vm",
                resolve: {
                    routeData: ["routeResolverService", (routeResolverService: Common.IRouteResolverService) => {
                        return routeResolverService.resolve("/");                        
                    }]
                }
            });
        }
    }

} 