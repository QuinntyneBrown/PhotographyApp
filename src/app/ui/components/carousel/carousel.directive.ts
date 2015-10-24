/// <reference path="../../../../../typings/typescriptapp.d.ts" />
 
module App.UI {

    "use strict";

    /**
     * @name Carousel
     * @module App.UI
     */
    export class Carousel {

        constructor(private getHtml: IGetHtmlFn) { }

        public static createInstance = (getHtml: IGetHtmlFn) => { return new Carousel(getHtml); }

        public template: string = [
            "<div class='carousel'> ",
            "<div class='view-port'>",
            "<div class='previous-arrow' data-ng-click='vm.onPrevious()'><img src='assets/images/carousel_button_prev.png' /></div>",
            "<div class='next-arrow' data-ng-click='vm.onNext()'><img src='assets/images/carousel_button_next.png' /></div>",
            "</div>",
            "</div>"
        ].join(" ");

        public restrict: string = "E";

        public replace: boolean = true;

        public transclude: string = "element";

        public controllerAs: string = "vm";

        public controller: string = "carouselController";

        public scope:any = { carouselFor:"=" };

        public compile = (template: ng.IAugmentedJQuery) => {

            return (scope: ng.IScope, element: ng.IAugmentedJQuery, attributes: ng.IAttributes, controller: any, transclude: any) => {
                transclude(scope.$new(), (clone: ng.IAugmentedJQuery) => {
                    controller.items = scope["carouselFor"];
                    var template = this.getHtml(<HTMLElement>clone[0].children[0], true);
                    alert(template);
                    controller.templateRef = angular.element(template);
                    controller.initialRender();
                });
            }
        };
    }

    angular.module("app.ui").directive("carousel", ["getHtml",Carousel.createInstance]);
}