module App.Photographer {

    "use strict";

    /**
     * @name AboutPhotographerController
     * @module App.Photographer
     */
    export class AboutPhotographerController {
        constructor(private routeData: Common.IRouteData) {}

        public get photographer() { return this.routeData["photographer"]; }

        public static canActivate = () => {
            return ["$q", "photographerDataService", "photographer", ($q:ng.IQService,photographerDataService: IPhotographerDataService, photographer: IPhotographer) => {
                var deferred = $q.defer();
                photographerDataService.getFeaturedPhotographer().then((results) => {
                    photographer.createInstanceAsync({ data: results.data }).then((results) => {
                        deferred.resolve(results);
                    });
                });
                return deferred.promise;
            }];
        }
    }

    angular.module("app.photographer")
        .controller("aboutPhotographerController", [AboutPhotographerController])
        .config([
        "routeResolverServiceProvider", (routeResolverServiceProvider: Common.IRouteResolverServiceProvider) => {
                routeResolverServiceProvider.configure({
                    route: "/about",
                    key: "photographer",
                    promise: AboutPhotographerController.canActivate()
                });
            }
        ]);

} 