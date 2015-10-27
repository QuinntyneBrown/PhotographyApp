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
            private $transclude: Function,
            private getHtml: IGetHtmlFn,
            private translateXAsync: ITranslateXAsync) {

            $transclude($scope, (clone: ng.IAugmentedJQuery) => {
                this.clone = clone;
                this.initialRender();
            });
        }

        public onNextAsync = () => {
            var deferred = this.$q.defer();
            if (!this.isAnimating) {
                var promises = [];
                this.isAnimating = true;
                for (var i = 0; i < this.slideNavtiveElements.length; i++) {
                    promises.push(this.translateXAsync({ element: this.slideNavtiveElements[i], x: 100 }));
                }
                this.$q.all(promises).then(() => {
                    this.isAnimating = false;
                    deferred.resolve();
                });
            } else {
                deferred.reject();
            }
            return deferred.promise;
        }

        public onPreviousAsync = () => {
            var deferred = this.$q.defer();
            if (!this.isAnimating) {
                var promises = [];
                this.isAnimating = true;
                for (var i = 0; i < this.slideNavtiveElements.length; i++) {
                    promises.push(this.translateXAsync({ element: this.slideNavtiveElements[i], x: 100 }));
                }
                this.$q.all(promises).then(() => {
                    this.isAnimating = false;
                    deferred.resolve();
                });
            } else {
                deferred.reject();
            }
            return deferred.promise;         
        }
         
        private initialRender = () => {
            var fragment = document.createDocumentFragment();
            var template = this.getHtml(<HTMLElement>this.clone[0].children[0], true);
                                           
            for (var i = 0; i < this.items.length; i++) {                                
                var childScope: any = this.$scope.$new(true);
                childScope[this.$attrs["carouselForName"] || "carouselItem"] = this.items[i];
                childScope.$$index = i;
                childScope.$$isFirst = (i === 0);
                childScope.$$isLast = (i === this.items.length - 1);                
                var itemContent = this.$compile(angular.element(template))(childScope);                
                itemContent.addClass("slide");
                fragment.appendChild(itemContent[0]);             
            }

            this.containerNavtiveElement.appendChild(fragment);
        }

        public isAnimating = false;

        public clone:ng.IAugmentedJQuery;

        public get items() { return this.$scope["carouselFor"]; }

        public get viewPortRef() { return this.$element.find(".view-port"); }

        public get containerNavtiveElement() { return this.$element.find(".container")[0]; }

        public get viewPortNavtiveElement() { return this.viewPortRef[0]; }

        public get slideNavtiveElements() { return this.viewPortNavtiveElement.children; }

        public get previousButtonImgUrl() { return this.$attrs["previousButtonImgUrl"] || "assets/images/carousel_button_prev.png"; }

        public get nextButtonImgUrl() { return this.$attrs["nextButtonImgUrl"] || "assets/images/carousel_button_next.png"; }

    }

    angular.module("app.ui").controller("carouselController", ["$attrs", "$compile", "$element", "$q", "$scope", "$transclude", "getHtml","translateXAsync", CarouselController]);
} 