/// <reference path="../../../../typings/typescriptapp.d.ts" />

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
            private $http: ng.IHttpService,
            private $q:ng.IQService,
            private $scope: any,
            private $timeout: ng.ITimeoutService,
            private position: IPosition) {

            this.bootstrap($element);

            $scope.$on("$destroy", () => {
                if (this.calloutScope)
                    this.calloutScope.$destroy();

                if (this.nativeCalloutHTMLElement) {
                    this.nativeCalloutHTMLElement.parentNode.removeChild(this.nativeCalloutHTMLElement);
                }

                this.calloutAugmentedJQuery = null;
                this.calloutScope = null;
                this.closeCalloutScheduledPromise = null;
            });
        }

        public calloutAugmentedJQuery: ng.IAugmentedJQuery;

        public get nativeCalloutHTMLElement() { return this.calloutAugmentedJQuery[0]; }

        public bootstrap = ($element: ng.IAugmentedJQuery) => {
            var nativeElement = $element[0];
            nativeElement.addEventListener(this.$attrs["triggerEvent"] || "click", () => {
                if (this.isAnimating)
                    return;

                if (this.isOpen) {
                    this.closeAsync();
                } else {
                    this.openAsync();
                }

            });
        }

        public get nativeOriginalHTMLElement() { return this.$element[0]; } 

        public isOpen: boolean = false;

        public isAnimating: boolean = false;

        public getCalloutTemplateAsync = ():ng.IPromise<any> => {
            var deferred = this.$q.defer();
            if (this.$attrs["templateUrl"]) {
                this.$http({ method: "GET", url: this.$attrs["templateUrl"] }).then((results) => {
                    this.calloutTemplate = <string>results.data;
                    deferred.resolve();
                });
            } else {
                this.calloutTemplate = this.defaultCalloutTemplate;
                deferred.resolve();
            }
            return deferred.promise;
        }

        public compileCalloutTemplateAsync = () => {
            var deferred = this.$q.defer();
            this.calloutAugmentedJQuery = this.$compile(this.calloutTemplate)(this.calloutScope);
            deferred.resolve();
            return deferred.promise;            
        }

        public positionCalloutAsync = () => {
            var deferred = this.$q.defer();
            this.position.below(this.nativeOriginalHTMLElement, this.nativeCalloutHTMLElement, 30).then(() => {
                deferred.resolve();
            });
            return deferred.promise; 
        }

        public appendToBodyAsync = () => {
            var deferred = this.$q.defer();
            document.body.appendChild(this.nativeCalloutHTMLElement);
            setTimeout(() => { deferred.resolve(); }, 0);
            return deferred.promise; 
        }

        public showCalloutElementAsync = () => {
            return this.setOpacityAsync({ opacity: 100 });
        }

        public hideCalloutElementAsync = () => {
            return this.setOpacityAsync({ opacity: 0 });
        }

        private setInitialCalloutCssAsync = () => {
            var deferred = this.$q.defer();
            this.nativeCalloutHTMLElement.setAttribute("style", "-webkit-transition: opacity " + this.transitionDurationInMilliseconds + "ms ease-in-out;-o-transition: opacity " + this.transitionDurationInMilliseconds + "ms ease-in-out;transition: opacity " + this.transitionDurationInMilliseconds + "ms ease-in-out;");
            this.nativeCalloutHTMLElement.style.opacity = "0";
            this.nativeCalloutHTMLElement.style.position = "fixed";
            this.nativeCalloutHTMLElement.style.top = "0";
            this.nativeCalloutHTMLElement.style.left = "0";
            this.nativeCalloutHTMLElement.style.display = "block";
            deferred.resolve();
            return deferred.promise;
        }

        public get transitionDurationInMilliseconds() { return 1000; }

        public setOpacityAsync = (options:any) => {
            var deferred = this.$q.defer();
            var self = this;
            self.calloutAugmentedJQuery.css("opacity", options.opacity);
            self.nativeCalloutHTMLElement.addEventListener('transitionend', resolve, false);
            function resolve() {
                self.nativeCalloutHTMLElement.removeEventListener('transitionend', resolve);
                deferred.resolve();
            }
            return deferred.promise;             
        }

        public openAsync = () => {
            var deferred = this.$q.defer();
            this.isAnimating = true;
            this.calloutScope = this.$scope.$new(true);

            this.getCalloutTemplateAsync()
                .then(this.compileCalloutTemplateAsync)
                .then(this.setInitialCalloutCssAsync)
                .then(this.positionCalloutAsync)
                .then(this.appendToBodyAsync)
                .then(this.showCalloutElementAsync)
                .then(() => {
                this.isAnimating = false;
                this.isOpen = true;
                this.closeCalloutScheduledPromise = this.$timeout(this.closeAsync, Number(this.$attrs["displayFor"] || 2000));
            });

            return deferred.promise;

        }

        public closeAsync = () => {
            var deferred = this.$q.defer();
            this.isAnimating = true;
            this.$timeout.cancel(this.closeCalloutScheduledPromise);
            this.hideCalloutElementAsync().then(() => {
                this.isOpen = false;
                this.calloutScope.$destroy();

                this.nativeCalloutHTMLElement.parentNode.removeChild(this.nativeCalloutHTMLElement);

                this.calloutAugmentedJQuery = null;
                this.calloutScope = null;
                this.closeCalloutScheduledPromise = null;
                this.calloutTemplate = null;

                this.isAnimating = false;
                deferred.resolve();
            });
            return deferred.promise;
        }

        public closeCalloutScheduledPromise: any = null;

        public defaultCalloutTemplate: string = ["<div class='callout'>", "<h1>Callout</h1>", "</div>"].join(" ");

        public calloutTemplate: string;

        public calloutScope: any;

    }

    angular.module("app.ui").controller("calloutController", ["$attrs", "$compile", "$element", "$http", "$q", "$scope","$timeout","position" ,CalloutController]);
} 