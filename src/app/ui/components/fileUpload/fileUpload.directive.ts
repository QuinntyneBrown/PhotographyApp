/// <reference path="../../../../../typings/typescriptapp.d.ts" />

module App.UI {

    "use strict";

    /**
     * @name FileUpload
     * @module App.UI
     */
    export class FileUpload {
        constructor() {}

        public static createInstance = () => { return new FileUpload(); }

        public template: string = [
            "<div>",
            '<div class="drop-zone">Drop your files here!</div>',
            "</div>"
        ].join("");

        public static styleUrls: Array<string> = ["/src/app/ui/components/fileUpload/fileUpload.css"];

        public restrict: string = "E";

        public replace: boolean = true;

        public scope: any = {};

    }

    angular.module("app.ui").directive("fileUpload", ["$rootScope", "uploadService", FileUpload.createInstance]);
} 