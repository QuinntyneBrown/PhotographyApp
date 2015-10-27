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
            this.bootstrap();            
        }

        public calloutAugmentedJQuery: ng.IAugmentedJQuery;

        public get nativeCalloutHTMLElement() { return this.calloutAugmentedJQuery[0]; }

        public bootstrap = () => {            
            this.nativeOriginalHTMLElement.addEventListener(this.$attrs["triggerEvent"] || "click", this.onTrigger);
            this.$scope.$on("$destroy", this.dispose);
        }

        public onTrigger = () => {
            if (this.isAnimating)
                return;

            if (this.isOpen) {
                this.closeAsync();
            } else {
                this.openAsync();
            }

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
            setTimeout(() => { deferred.resolve(); }, 100);
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

        public get transitionDurationInMilliseconds() { return this.$attrs["transitionDurationInMilliseconds"] || 1000; }

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
                this.dispose();
                this.isOpen = false;
                this.isAnimating = false;
                deferred.resolve();
            });
            return deferred.promise;
        }

        public dispose = () => {
            if (this.calloutScope) {
                this.calloutScope.$destroy();
                this.calloutScope = null;
            }

            if (this.calloutAugmentedJQuery) {
                var $target = angular.element(this.nativeCalloutHTMLElement);
                this.nativeCalloutHTMLElement.parentNode.removeChild(this.nativeCalloutHTMLElement);
                this.calloutAugmentedJQuery = null; 
                $target.remove();               
            }

            this.closeCalloutScheduledPromise = null;
            this.calloutTemplate = null;            
        }

        public closeCalloutScheduledPromise: any = null;

        public defaultCalloutTemplate: string = ["<div class='callout'>", "<h1>Callout</h1>", "</div>"].join(" ");

        public calloutTemplate: string;

        public calloutScope: any;

    }

    angular.module("app.ui").controller("calloutController", ["$attrs", "$compile", "$element", "$http", "$q", "$scope","$timeout","position" ,CalloutController]);
} 