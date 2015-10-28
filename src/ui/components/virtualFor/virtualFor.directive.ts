/// <reference path="../../../../typings/typescriptapp.d.ts" />

module App.UI {

    "use strict";

    /**
     * @name VirtualFor
     * @module App.UI
     */
    export class VirtualFor {

        public static createInstance = () => {
            return new VirtualFor();
        }

    }

    angular.module("app.ui").directive("virtualFor", [VirtualFor]);
}

