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
            private appendToBodyAsync: any,
            private backDrop:any,
            private destroyScope:any,
            private extendCssAsync: Function,
            private parseBoolean:any,
            private position: IPosition,
            private removeElement:any,
            private setOpacityAsync: any) {
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
                this.closeAsync().then(() => {
                    if (this.backDropInstance) {
                        this.backDropInstance.closeAsync().then(() => {
                            this.backDropInstance = null;
                        });
                    }
                });
            } else {

                if (this.displayBackDrop) {
                    this.backDropInstance = this.backDrop.createInstance();
                    this.backDropInstance.openAsync()
                        .then(this.openAsync);
                } else {
                    this.openAsync();    
                }
                
            }

        }

        public backDropInstance: any = null;

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

            //if fullwidth, should place above, below or onTop

            //if full height, should place right, left or onTop

            // full screen, should place at top left

            this.position.below(this.nativeOriginalHTMLElement, this.nativeCalloutHTMLElement, 30).then(() => {
                deferred.resolve();
            });
            return deferred.promise; 
        }

        public appendCalloutToBodyAsync = () => { return this.appendToBodyAsync({ nativeHTMLElement: this.nativeCalloutHTMLElement }); }

        public showCalloutElementAsync = () => { return this.setOpacityAsync({ nativeHtmlElement: this.nativeCalloutHTMLElement, opacity: 100 }); }

        public hideCalloutElementAsync = () => {
            return this.setOpacityAsync({ nativeHtmlElement: this.nativeCalloutHTMLElement, opacity: 0 });
        }

        private setInitialCalloutCssAsync = () => {
            return this.extendCssAsync({
                nativeHTMLElement: this.nativeCalloutHTMLElement, cssObject: {
                    "-webkit-transition": "opacity " + this.transitionDurationInMilliseconds + "ms ease-in-out",
                    "-o-transition": "opacity " + this.transitionDurationInMilliseconds + "ms ease-in-out",
                    "transition": "opacity " + this.transitionDurationInMilliseconds + "ms ease-in-out",
                    "opacity": "0",
                    "position": "fixed",
                    "top": "0",
                    "left": "0",
                    "display": "block"
                }
            });
        }

        public get transitionDurationInMilliseconds() { return this.$attrs["transitionDurationInMilliseconds"] || 1000; }

        public openAsync = () => {
            var deferred = this.$q.defer();
            this.isAnimating = true;
            this.calloutScope = this.$scope.$new();
            this.getCalloutTemplateAsync()
                .then(this.compileCalloutTemplateAsync)
                .then(this.setInitialCalloutCssAsync)
                .then(this.positionCalloutAsync)
                .then(this.appendCalloutToBodyAsync)
                .then(this.showCalloutElementAsync)
                .then(() => {
                this.isAnimating = false;
                this.isOpen = true;

                
                this.closeCalloutScheduledPromise = this.$timeout(this.closeAsync, Number(this.$attrs["displayFor"] || 2000), false);
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
            this.destroyScope({ scope: this.calloutScope });
            this.removeElement({ nativeHTMLElement: this.nativeCalloutHTMLElement });
            this.calloutAugmentedJQuery = null;
            this.closeCalloutScheduledPromise = null;
            this.calloutTemplate = null;            
        }

        public closeCalloutScheduledPromise: any = null;

        public get defaultDirection() { return this.$attrs["defaultDirection"] || "bottom"; }

        public get isFullHeight() { return this.parseBoolean(this.$attrs["isFullHeight"]); }

        public get isFullWidth() { return this.parseBoolean(this.$attrs["isFullWidth"]); }

        public get isFullScreen() { return this.parseBoolean(this.$attrs["isFullScreen"]); }

        public get displayBackDrop() { return this.parseBoolean(this.$attrs["displayBackDrop"]); }

        public defaultCalloutTemplate: string = ["<div class='callout'>", "<h1>Callout</h1>", "</div>"].join(" ");

        public calloutTemplate: string;

        public calloutScope: any;

    }

    angular.module("app.ui").controller("calloutController", [
        "$attrs",
        "$compile",
        "$element",
        "$http",
        "$q",
        "$scope",
        "$timeout",
        "appendToBodyAsync",
        "backDrop",
        "destroyScope",
        "extendCssAsync",
        "parseBoolean",
        "position",
        "removeElement",
        "setOpacityAsync", CalloutController]);
} 