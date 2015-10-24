module App.UI {

    "use strict";

    /**
     * @name CalloutController
     * @module App.UI
     */
    export class CalloutController {
        constructor(            
            private $attrs: ng.IAttributes,
            private $compile: ng.ICompileService,
            private $element: ng.IAugmentedJQuery,
            private $scope: any) {

            this.bootstrap($element);

            $scope.$on("$destroy", () => {
                // clean up
            });
        }

        public calloutAugmentedJQuery: ng.IAugmentedJQuery;

        public get nativeCalloutHTMLElement() { return this.calloutAugmentedJQuery[0]; }

        public bootstrap = ($element: ng.IAugmentedJQuery) => {
            var nativeElement = $element[0];
            nativeElement.addEventListener(this.$attrs["triggerEvent"] || "click", () => {

            });
        }

        public get nativeOriginalHTMLElement() { return this.$element[0]; } 

        public isOpen: boolean = false;

        public isAnimating: boolean = false;

        public open = () => {

        }

        public close = () => {

        }
    }

    angular.module("app.ui").controller("calloutController", ["$attrs","$compile", "$element", "$scope", CalloutController]);
} 