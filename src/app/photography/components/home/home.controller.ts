﻿module App.Photography {

    "use strict";

    /**
     * @name HomeController
     * @module App.Photography
     */
    export class HomeController implements IHomeController {
        //constructor(photo: IPhoto, routeData: any) { }
        constructor() {
            this.photos = [{ base64String: "" }];
        }

        private _slideTemplate: string;

        public get slideTemplate() { return this._slideTemplate; }

        public set slideTemplate(value:string) { this._slideTemplate = value; }

        private _photos: Array<IPhoto> = [];

        public get photos() { return this._photos; }

        public set photos(value: Array<IPhoto>) { this._photos = value; }

        public static canActivate = () => {
            return ["$http", "$q", "photoDataService", ($http: ng.IHttpService, $q: ng.IQService, photoDataService: IPhotoDataService) => {
                var deferred = $q.defer();
                $q.all([
                    $http.get("src/app/photography/components/home/photoSlide.html"),
                    photoDataService.getAllFeaturedPhotos()
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
        .controller("homeController", [HomeController])
        .config(["routeResolverServiceProvider", (routeResolverServiceProvider: App.Common.IRouteResolverServiceProvider) => {

        routeResolverServiceProvider.configure({
            route:"/",
            promise: HomeController.canActivate()
        });

    }]);
} 