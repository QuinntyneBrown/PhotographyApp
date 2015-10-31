module App {
    
    export var Route = (options: any) => {        
        options.$routeProvider.when(options.when, {
            templateUrl: options.componentTemplateUrl,
            controller: options.componentName,
            controllerAs: "vm",
            resolve: {
                routeData: ["routeResolverService", (routeResolverService: Common.IRouteResolverService) => {
                    return routeResolverService.resolve(options.when);
                }]
            }
        });
    }
}
