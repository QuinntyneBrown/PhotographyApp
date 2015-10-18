/// <reference path="../../../../typings/typescriptapp.d.ts" />

module App.Photography {
    
    export class PhotographyDataService {
        
        constructor(dataService: Data.IDataService) { }


    }

    angular.module("app.photography").service("photographyDataService", ["dataService",PhotographyDataService]);
} 