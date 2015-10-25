/// <reference path="../../../../typings/typescriptapp.d.ts" />

module App.UI {

    "use strict";

    export class VirtualFor {
        constructor() { }

        public static createInstance = () => {
            return new VirtualFor();
        }

    }

    angular.module("app.ui").directive("virtualFor", [VirtualFor]);
}

