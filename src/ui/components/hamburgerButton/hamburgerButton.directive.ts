/// <reference path="../../../../typings/typescriptapp.d.ts" />

module App.UI {

    "use strict";

    /**
     * @name HamburgerButton
     * @module App.UI
     */
    export class HamburgerButton {

        public static createInstance = () => { return new HamburgerButton(); }

        public template: string = [
            "<div class='hamburger-button' data-ng-click='onClick()'>",
            "<div></div>",
            "<div></div>",
            "<div></div>",
            "</div>"
        ].join(" ");

        public replace: boolean = true;

        public restrict: string = "E";

        public scope: any = { onClick: "&" };
    }

    angular.module("app.ui").directive("hamburgerButton", [HamburgerButton.createInstance]);

} 