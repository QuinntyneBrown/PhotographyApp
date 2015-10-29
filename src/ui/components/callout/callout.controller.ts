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

        public get nativeCalloutElement() { return this.calloutAugmentedJQuery ? this.calloutAugmentedJQuery[0] : null; }

        public bootstrap = () => {
            this.triggerEvent = this.$attrs["triggerEvent"] || "click";
            this.nativeOriginalHTMLElement.addEventListener(this.triggerEvent, this.onTrigger);
            this.$scope.$on("$destroy", () => {
                this.dispose();                
                this.nativeOriginalHTMLElement.removeEventListener(this.triggerEvent, this.onTrigger);
                angular.element(this.nativeOriginalHTMLElement).remove();               
                this.$element.remove();
                this.$element = null;
                this.$attrs = null;
            });
        }

        public triggerEvent: string;

        public onTrigger = () => {
            if (this.isAnimating)
                return;

            if (this.isOpen) {
                this.closeAsync();
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
            this.position.below(this.nativeOriginalHTMLElement, this.nativeCalloutElement, 30).then(() => {
                deferred.resolve();
            });
            return deferred.promise; 
        }

        public appendCalloutToBodyAsync = () => { return this.appendToBodyAsync({ nativeHTMLElement: this.nativeCalloutElement }); }

        public showCalloutElementAsync = () => { return this.setOpacityAsync({ nativeHtmlElement: this.nativeCalloutElement, opacity: 100 }); }

        public hideCalloutElementAsync = () => {
            return this.setOpacityAsync({ nativeHtmlElement: this.nativeCalloutElement, opacity: 0 });
        }

        private setInitialCalloutCssAsync = () => {
            return this.extendCssAsync({
                nativeHTMLElement: this.nativeCalloutElement, cssObject: {
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

                if (this.backDropInstance) {
                    this.backDropInstance.closeAsync().then(() => {
                        deferred.resolve();
                        this.backDropInstance = null;
                    });
                } else {
                    deferred.resolve();    
                }
                
            });
            return deferred.promise;
        }

        public dispose = () => {
            this.destroyScope({ scope: this.calloutScope });
            this.removeElement({ nativeHTMLElement: this.nativeCalloutElement });
            this.calloutAugmentedJQuery = null;
            this.closeCalloutScheduledPromise = null;
            this.calloutTemplate = null;            
        }

        public closeCalloutScheduledPromise: any = null;

        public get defaultDirection() { return this.$attrs["defaultDirection"] || "bottom"; }

        public get displayBackDrop() { return this.parseBoolean({ value: this.$attrs["displayBackDrop"] }); }

        public defaultCalloutTemplate: string = [
            "<div class='callout'>",
            "<h1>Callout</h1>",
            "</div>"
        ].join(" ");

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