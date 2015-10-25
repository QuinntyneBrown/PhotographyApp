/// <reference path="../../../typings/typescriptapp.d.ts" />

module App.Photography {

    "use strict";

    export class Routes {
        
        public static Configure = ($routeProvider: ng.route.IRouteProvider) => {
            $routeProvider.when("/", {
                templateUrl: "src/app/photography/components/home/home.html",
                controller: "homeController",
                controllerAs: "vm"
                //resolve: {
                //    routeData: ["routeResolverService", (routeResolverService:App.Common.IRouteResolverService) => {
                //        return routeResolverService.resolve("/");
                //    }]
                //}
            });

            $routeProvider.when("/upload", {
                templateUrl: "src/app/photography/components/photoUpload/photoUpload.html",
                controller: "photoUploadController",
                controllerAs: "vm"
                //resolve: {
                //    routeData: ["routeResolverService", (routeResolverService:App.Common.IRouteResolverService) => {
                //        return routeResolverService.resolve("/upload");
                //    }]
                //}
            });
        }
    }

} 