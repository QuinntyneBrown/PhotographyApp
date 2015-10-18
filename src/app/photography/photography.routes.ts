/// <reference path="../../../typings/typescriptapp.d.ts" />

module App.Photography {
    
    export class Routes {
        
        public static Configure = ($routeProvider: ng.route.IRouteProvider) => {
            $routeProvider.when("/", {
                templateUrl: "src/app/photography/views/featureCarousel.html"
            });
        }
    }
} 