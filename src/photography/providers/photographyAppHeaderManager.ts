/// <reference path="../../../typings/typescriptapp.d.ts" />


module App.Photography {

    "use strict";

    /**
    * @name PhotographyAppHeaderManager
    * @module App.Photography
    */
    export class PhotographyAppHeaderManager implements UI.IAppHeaderManager {
        
        constructor() { }

        private _links: Array<any> = [];

        public get links() { return this._links; }

        public set links(value:any) { this._links = value; }

    }

    angular.module("app.photography").service("photographyAppHeaderManager", [PhotographyAppHeaderManager]);
}