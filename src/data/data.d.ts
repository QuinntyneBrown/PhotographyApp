/// <reference path="../../typings/typescriptapp.d.ts" />

declare module App.Data {
    
    /**
     * @name IDataService
     * @module App.Data
     */
    export interface IDataService {
        fromServiceOrCache(options: any): ng.IPromise<any>;
        fromService(options: any): ng.IPromise<any>;
    }
} 