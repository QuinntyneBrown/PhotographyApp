/// <reference path="../../../typings/typescriptapp.d.ts" />


module App.Common {

    "use strict";

    /**
     * @name LocalStorageService
     */
    export class LocalStorageService implements  ILocalStorageService {
        constructor() { }

        public get = (options: any) => {
            
        }

        public set = (options: any) => {
            
        }

        private _inMemoryStorage:any = {};
    }

    angular.module("app.common").service("localStorageService", ["localStorage",LocalStorageService]);
} 