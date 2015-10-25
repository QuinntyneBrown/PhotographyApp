/// <reference path="../../../../../typings/typescriptapp.d.ts" />

module App.Photography {

    "use strict";

    export class PhotoUploadController {
        
        constructor() {}

        public get photoUploadUrl() { return "http://localhost:65186/api/photo/upload"; }

    }

    
    angular.module("app.photography").controller("photoUploadController", [PhotoUploadController]);
}
 