/// <reference path="../../../../../typings/typescriptapp.d.ts" />
 
module App.UI {

    /**
     * @name Carousel
     */
    export class Carousel {

        constructor(private $compile: ng.ICompileService) { }

        public static createInstance = ($compile: ng.ICompileService) => {
            return new Carousel($compile);
        }

        public templateUrl: string = "src/app/ui/components/carousel/carousel.html";

        public restrict: string = "E";

        public replace: boolean = true;

        public controllerAs: string = "vm";

        public controller: string = "carouselController";

        public scope:any = {
            slideTemplateUrl: "@",                        
        }

        public link = (scope: ng.IScope, element: ng.IAugmentedJQuery, attributes: ng.IAttributes) => {


            var items: Array<any> = parseItems(scope, attributes);

            for (var i = 0; i < items.length; i++) {
                
            }

            function parseItemName(attributes: ng.IAttributes): string {
                var match = attributes["carousel"].match(/^\s*(.+)\s+in\s+(.*?)\s*(\s+track\s+by\s+(.+)\s*)?$/);
                return match[1];
            }

            function parseItems(scope: ng.IScope, attributes: ng.IAttributes): Array<any> {
                var match = attributes["carousel"].match(/^\s*(.+)\s+in\s+(.*?)\s*(\s+track\s+by\s+(.+)\s*)?$/);
                if (match) {
                    var collectionStringArray = match[2].split(".");
                    var items: any = scope;
                    for (var i = 0; i < collectionStringArray.length; i++) {
                        items = items[collectionStringArray[i]];
                    }
                    return items;
                } else {
                    return JSON.parse(attributes["carousel"]);
                }
            }
        }
    }

    angular.module("app.ui").directive("carousel", ["$compile",Carousel.createInstance]);
}