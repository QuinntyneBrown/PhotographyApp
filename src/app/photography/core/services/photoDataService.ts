/// <reference path="../../../../../typings/typescriptapp.d.ts" />

module App.Photography {

    "use strict";
    
    /**
    * @name PhotoDataService
    * @module App.Photography
    */
    export class PhotoDataService implements IPhotoDataService {
        
        constructor(private apiEndpoint: Common.IApiEndpointConfig, private dataService: Data.IDataService) {
            
        }

        public getAllFeaturedPhotos = () => {
            return this.dataService.fromServiceOrCache({ url: this.baseUri + "/allFeaturedPhotos" });
        }

        private get baseUri() {
            return this.apiEndpoint.getBaseUrl("photo");
        }
    }

    angular.module("app.photography").service("photoDataService", ["dataService", PhotoDataService]);
} 