module App.Security {
    
    export class Routes {
        
        public static Configure = ($routeProvider: ng.route.IRouteProvider) => {

            $routeProvider.when("/login", {
                templateUrl: "src/app/security/views/login.html"
            });
                    
        }
    }
} 