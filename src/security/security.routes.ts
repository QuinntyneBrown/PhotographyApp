module App.Security {
    
    export class SecurityRoutes {
        
        public static Configure = ($routeProvider: any) => {

            $routeProvider.when("/login", {
                templateUrl: "src/security/components/login/login.html",
                controller: "loginController",
                controllerAs: "vm",
                authenticationRequired: false
            });
                    
        }
    }
} 