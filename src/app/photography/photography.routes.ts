/// <reference path="../../../typings/typescriptapp.d.ts" />

module App.Photography {
    
    export class Routes {
        
        public static Configure = ($routeProvider: ng.route.IRouteProvider) => {
            $routeProvider.when("/", {
                templateUrl: "src/app/photography/components/home/home.html",
                controller: "homeController",
                controllerAs: "vm",
                resolve: {
                    routeData: ["routeResolver", (routeResolverService:App.Common.IRouteResolverService) => {
                        return routeResolverService.resolve("/");
                    }]
                }
            });
        }
    }
} 