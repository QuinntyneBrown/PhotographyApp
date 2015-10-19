module App.Photography {
    
    export class HomeController {
        constructor(routeData: any, photo: IPhoto) { }

        private _photos: Array<IPhoto> = [];

        public get photos() { return this._photos; }

        public set photos(value: Array<IPhoto>) { this._photos = value; }

        public static canActivate = () => {
            return ["$http", "$q", "photographyDataService", ($http: ng.IHttpService, $q: ng.IQService, photographyDataService: any) => {
   
                }];
        }
    }

    angular.module("app.photography")
        .controller("homeController", ["routeData", HomeController])
        .config(["routeResolverServiceProvider", (routeResolverServiceProvider: App.Common.IRouteResolverServiceProvider) => {
            
        }]);
} 