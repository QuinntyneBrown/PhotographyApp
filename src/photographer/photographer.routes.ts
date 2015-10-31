/// <reference path="../../typings/typescriptapp.d.ts" />

module App.Photographer {

    "use strict";

    export class PhotographerRoutes {
        
        public static Configure = ($routeProvider: ng.route.IRouteProvider) => {
            $routeProvider.when("/about", {
                templateUrl: "src/photographer/components/aboutPhotographer/aboutPhotographer.html",
                controller: "aboutPhotographerController",
                controllerAs: "vm",
                resolve: {
                    routeData: ["routeResolverService", (routeResolverService: Common.IRouteResolverService) => {
                        return routeResolverService.resolve("/about");                        
                    }]
                }
            });
        }
    }

} 