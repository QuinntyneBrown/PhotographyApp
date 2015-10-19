/// <reference path="../../../../../typings/typescriptapp.d.ts" />

module App.UI {
    
    /**
     * @name CarouselController
     */
    export class CarouselController {

        constructor(private $attrs: ng.IAttributes,
            private $compile: ng.ICompileService,
            private $element: ng.IAugmentedJQuery,
            private $scope: ICarouselScope) {
            this.initialRender();
        }

        public onNext = () => {

        }

        public onPrevious = () => {

        }

        private initialRender = () => {
            var template = this.$scope.slideTemplate;
            var items: Array<any> = this.parseItems(this.$scope, this.$attrs);
            var itemName: string = this.parseItemName(this.$attrs);

            for (var i = 0; i < items.length; i++) {
                var fragment = document.createDocumentFragment();
                var childScope: any = this.$scope.$new(true);
                childScope[itemName] = items[i];
                childScope.$$index = i;
                var itemContent = this.$compile(angular.element(template))(childScope);
                fragment.appendChild(itemContent[0]);
            }
            this.$element[0].appendChild(fragment);
        }

        private parseItemName = ($attrs: ng.IAttributes): string => {
            var match = $attrs["carousel"].match(/^\s*(.+)\s+in\s+(.*?)\s*(\s+track\s+by\s+(.+)\s*)?$/);
            return match[1];
        }
 
        private parseItems = ($scope: ng.IScope, $attrs: ng.IAttributes): Array<any> => {
            var match = $attrs["carousel"].match(/^\s*(.+)\s+in\s+(.*?)\s*(\s+track\s+by\s+(.+)\s*)?$/);
            if (match) {
                var collectionStringArray = match[2].split(".");
                var items: any = $scope;
                for (var i = 0; i < collectionStringArray.length; i++) {
                    items = items[collectionStringArray[i]];
                }
                return items;
            } else {
                return JSON.parse($attrs["carousel"]);
            }
        }
    }

    angular.module("app.ui").controller("carouselControler", ["$attrs", "$compile", "$element", "$scope", CarouselController]);
} 