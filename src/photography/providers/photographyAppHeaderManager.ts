/// <reference path="../../../typings/typescriptapp.d.ts" />

module App.Photography {

    "use strict";

    /**
    * @name PhotographyAppHeaderManager
    * @module App.Photography
    */
    export class PhotographyAppHeaderManager implements UI.IAppHeaderManager {

        private _links: Array<any> = [
            { caption: "Home", url: "#/" },
            { caption: "Photos", url: "#/photos" },
            { caption: "Rates", url: "#/rates" },
            { caption: "About", url: "#/about" }
        ];

        public get links() { return this._links; }

        public set links(value: any) { this._links = value; }

        public getMobileMenuTemplateUrl() {
            return "/src/photography/components/mobileMenu/mobileMenu.html";
        }

    }

    angular.module("app.photography").service("photographyAppHeaderManager", [PhotographyAppHeaderManager]);
}