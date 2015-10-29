/// <reference path="../../../../typings/typescriptapp.d.ts" />

module App.UI {

    "use strict";

    /**
     * @name Carousel
     * @module App.UI
     */
    export class Carousel {

        public static createInstance = () => { return new Carousel(); }

        public template: string = [
            "<div class='carousel'> ",
            "<div class='view-port'>",
            "<div class='container'></div>",
            "<div class='previous-arrow' data-ng-click='vm.onPreviousAsync()'><img src='assets/images/carousel_button_prev.png' /></div>",
            "<div class='next-arrow' data-ng-click='vm.onNextAsync()'><img src='assets/images/carousel_button_next.png' /></div>",
            "</div>",
            "</div>"
        ].join(" ");

        public restrict: string = "E";

        public replace: boolean = true;

        public transclude: string = "element";

        public controllerAs: string = "vm";

        public controller: string = "carouselController";

        public scope: any = { carouselFor: "=" };

        public compile = (template: ng.IAugmentedJQuery) => {
            return (scope: ng.IScope, element: ng.IAugmentedJQuery, attributes: ng.IAttributes, controller: any, transclude: any) => {
                transclude(scope.$new(), (clone: ng.IAugmentedJQuery) => {
                    controller.clone = clone;
                    controller.initialRender();
                });
            }
        }
    }

    angular.module("app.ui").directive("carousel", [Carousel.createInstance]);
}