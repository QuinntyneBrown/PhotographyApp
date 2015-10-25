/// <reference path="../../../../../typings/typescriptapp.d.ts" />

module App.Photography {

    "use strict";
    
    /**
    * @name GalleryDataService
    * @module App.Photography
    */
    export class GalleryDataService implements IGalleryDataService {

        constructor(private apiEndpoint: Common.IApiEndpointConfig, private dataService: Data.IDataService) {

        }

        public getByName = (options:any) => {
            return this.dataService.fromServiceOrCache({ url: this.baseUri + "/getByName", params: options.params });
        }

        private get baseUri() { return this.apiEndpoint.getBaseUrl("photography") + "/gallery"; }
    }

    angular.module("app.photography").service("galleryDataService", ["dataService", PhotoDataService]);
} 