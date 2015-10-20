module App.Photography {
    
    export class HomeController implements IHomeController {
        constructor(routeData: any, photo: IPhoto) { }

        private _slideTemplate: string;

        public get slideTemplate() { return this._slideTemplate; }

        public set slideTemplate(value:string) { this._slideTemplate = value; }

        private _photos: Array<IPhoto> = [];

        public get photos() { return this._photos; }

        public set photos(value: Array<IPhoto>) { this._photos = value; }

        public static canActivate = () => {
            return ["$http", "$q", "photographyDataService", ($http: ng.IHttpService, $q: ng.IQService, photographyDataService: IPhotographyDataService) => {

                var deferred = $q.defer();

                $q.all([
                    $http.get("src/app/photography/views/partials/slideTemplate.html"),
                    photographyDataService.getAllFeaturedPhotos()
                ]).then((results: any) => {
                    deferred.resolve({
                        slideTemplate: results[0],
                        photos: results[1]
                    });
                });

                return deferred.promise;

            }];
        }
    }

    angular.module("app.photography")
        .controller("homeController", ["routeData", HomeController])
        .config(["routeResolverServiceProvider", (routeResolverServiceProvider: App.Common.IRouteResolverServiceProvider) => {
            
        }]);
} 