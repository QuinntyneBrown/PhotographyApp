/// <reference path="../../../../../typings/typescriptapp.d.ts" />

module App.UI {

    "use strict";

    /**
     * @name Callout
     * @module App.UI
     */
    export class Callout {

        constructor() { }

        public static createInstance = () => { return new Callout(); }

        public static styleUrls: Array<string> = ["/src/app/ui/compoonents/callout/callout.css"];

        public restrict: string = "A";

        public replace: boolean = true;

        public controller: string = "calloutController";

        public controllerAs: string = "vm";
    }

    angular.module("app.ui").directive("callout", [Callout.createInstance]);

} 