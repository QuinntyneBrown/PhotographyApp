/// <reference path="../../../../../typings/typescriptapp.d.ts" />

module App.UI {
    
    /**
     * @name CarouselController
     * @module App.UI
     */
    export class CarouselController {

        constructor(private $attrs: ng.IAttributes,
            private $compile: ng.ICompileService,
            private $element: ng.IAugmentedJQuery,
            private $scope: ICarouselScope) {
        }

        public onNext = () => {
            
        }

        public onPrevious = () => {

        }

        private _templateRef: ng.IAugmentedJQuery;
        
        public get templateRef() { return this._templateRef; }
        
        public set templateRef(value: ng.IAugmentedJQuery) { this._templateRef = value; }

        private _items: Array<any>;

        public get items() { return this._items; }

        public set items(value: Array<any>) {
             this._items = value;
        }
                 
        private initialRender = () => {                        
            for (var i = 0; i < this.items.length; i++) {
                var fragment = document.createDocumentFragment();
                var childScope: any = this.$scope.$new(true);
                childScope["carouselItem"] = this.items[i];
                childScope.$$index = i;
                var itemContent = this.$compile(this.templateRef)(childScope);
                fragment.appendChild(itemContent[0]);
            }
            var viewPortRef = this.$element.find(".view-port");            
            viewPortRef[0].appendChild(fragment);
        }

    }

    angular.module("app.ui").controller("carouselController", ["$attrs", "$compile", "$element", "$scope", CarouselController]);
} 