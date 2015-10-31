/// <reference path="../../../typings/typescriptapp.d.ts" />

module App.Photography {

    "use strict";
    
    /**
    * @name PhotoDataService
    * @module App.Photography
    */
    export class PhotoDataService implements IPhotoDataService {
        
        constructor(private $q: ng.IQService,
            private apiEndpoint: Common.IApiEndpointConfig,
            private dataService: Data.IDataService) {
            
        }

        public getAllFeaturedPhotos = () => {
            return this.$q.when({
                data: [
                    { url: "assets/images/DSC_1287.JPG" },
                    { url: "assets/images/DSC_1256.JPG" },
                    { url: "assets/images/DSC_1245.JPG" }
                ]
            });
        }

        private get baseUri() { return this.apiEndpoint.getBaseUrl("photography") + "/photo"; }
    }

    angular.module("app.photography").service("photoDataService", ["$q","apiEndpoint","dataService", PhotoDataService]);
} 