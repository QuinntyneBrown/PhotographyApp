/// <reference path="../../../../typings/typescriptapp.d.ts" />

module App.UI {
    
    /**
     * @name CarouselController
     * @module App.UI
     */
    export class CarouselController {

        constructor(private $attrs: ng.IAttributes,
            private $compile: ng.ICompileService,
            private $element: ng.IAugmentedJQuery,
            private $q: ng.IQService,
            private $scope: ICarouselScope,
            private translateXAsync: ITranslateXAsync) {
        }

        public onNext = () => {
            if (!this.isAnimating) {
                var promises = [];
                this.isAnimating = true;
                for (var i = 0; i < this.slideNavtiveElements.length; i++) {
                    promises.push(this.translateXAsync({ element: this.slideNavtiveElements[i], x: 100 }));
                }
                this.$q.all(promises).then(() => {
                    this.isAnimating = false;
                });
            }
        }

        public onPrevious = () => {

        }

        public isAnimating = false;

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
                itemContent.addClass("slide");
                fragment.appendChild(itemContent[0]);
            }
                        
            this.viewPortNavtiveElement.appendChild(fragment);
        }

        public get viewPortRef() { return this.$element.find(".view-port"); }

        public get viewPortNavtiveElement() { return this.viewPortRef[0]; }

        public get slideNavtiveElements() { return this.viewPortNavtiveElement.children; }



    }

    angular.module("app.ui").controller("carouselController", ["$attrs", "$compile", "$element", "$q", "$scope","translateXAsync", CarouselController]);
} 