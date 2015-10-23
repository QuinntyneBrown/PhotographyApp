/// <reference path="../../../../../typings/typescriptapp.d.ts" />

module App.UI {

    "use strict";

    /**
     * @name UploadService
     * @module App.UI
     */
    export class UploadService {
        
        constructor(private dataService: Data.IDataService) { }

        public uploadFiles = (options:any) => {
            return this.dataService.fromService({ url: options.url, method: "POST", data: options.formData, headers: { 'Content-Type': undefined }  });
        }
    }

    angular.module("app.ui").service("uploadService", ["dataService",UploadService]);
} 