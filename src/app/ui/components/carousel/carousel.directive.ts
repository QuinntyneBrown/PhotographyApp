/// <reference path="../../../../../typings/typescriptapp.d.ts" />
 
module App.UI {

    /**
     * @name Carousel
     */
    export class Carousel {

        constructor() { }

        public static createInstance = () => {
            return new Carousel();
        }

        public templateUrl: string = "src/app/ui/components/carousel/carousel.html";

        public restrict: string = "A";

        public replace: boolean = true;

        public controllerAs: string = "vm";

        public controller: string = "carouselController";

        public scope:any = {
            slideTemplateUrl: "@",                        
        };

        public link = () => { }
    }

    angular.module("app.ui").directive("carousel", [Carousel.createInstance]);
}