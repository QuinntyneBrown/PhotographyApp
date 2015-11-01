module App.Photography {

    "use strict";

    /**
     * @name HomeComponent
     * @module App.Photography
     */
    export class HomeComponent implements IHomeComponent {
        
        constructor(private $q:ng.IQService, private routeData:any) { }
        
        public get photos() { return this.routeData.photos; }

        public static canActivate = () => {
            return ["$http", "$q", "photo", "photoDataService", ($http: ng.IHttpService, $q: ng.IQService, photo: IPhoto, photoDataService: IPhotoDataService) => {
                var deferred = $q.defer();
                
                photoDataService.getAllFeaturedPhotos().then((results) => {
                    var promises = [];
                    for (var i = 0; i < results.data.length; i++) {
                        promises.push(photo.createInstanceAsync({ data: results.data[i] }));
                    }

                    $q.all(promises).then((photos: Array<IPhoto>) => {
                        deferred.resolve(photos);
                    });
                });
                
                return deferred.promise;
            }];
        }
    }

    ngX.Component({
        module: "app.photography",
        component: HomeComponent,
        componentName: "homeComponent",
        providers: ["$q", "routeData"],
        routes: ["/","/photos"],
        key: "photos"
    });

} 