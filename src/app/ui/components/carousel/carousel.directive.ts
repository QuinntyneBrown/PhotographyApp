/// <reference path="../../../../../typings/typescriptapp.d.ts" />
 
module App.UI {

    export class Carousel {

        public static createInstance = () => { }

        public templateUrl: string = "src/app/ui/components/carousel/carousel.html";

        public restrict: string = "E";

        public replace: boolean = true;

        public controllerAs: string = "vm";

        public controller: string = "carouselController";

        public link = (scope: ng.IScope, element: ng.IAugmentedJQuery, attributes: ng.IAttributes) => {

        }
    }

    angular.module("app.ui").directive("carousel", [Carousel.createInstance]);
}