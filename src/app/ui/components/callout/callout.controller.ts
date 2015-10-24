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
                if (!this.isAnimating)
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
            return deferred.promise; 
        }

        public showCalloutElementAsync = () => {
            return this.setOpacityAsync({ opacity: 100 });
        }

        public hideCalloutElementAsync = () => {
            return this.setOpacityAsync({ opacity: 0 });
        }

        public setOpacityAsync = (options:any) => {
            var deferred = this.$q.defer();
            this.calloutAugmentedJQuery.css("opacity", options.opacity);
            this.nativeCalloutHTMLElement.addEventListener('transitionend', () => {
                deferred.resolve();
            }, false);
            return deferred.promise;             
        }

        public openAsync = () => {
            var deferred = this.$q.defer();
            this.isAnimating = true;
            this.calloutScope = this.$scope.$new(true);

            this.getCalloutTemplateAsync()
                .then(this.compileCalloutTemplateAsync)
                .then(this.positionCalloutAsync)
                .then(this.appendToBodyAsync)
                .then(this.showCalloutElementAsync)
                .then(() => {
                this.isAnimating = false;
                this.closeCalloutScheduledPromise = this.$timeout(this.closeAsync, Number(this.$attrs["displayFor"] || 500));
            });

            return deferred.promise;

        }

        public closeAsync = () => {
            var deferred = this.$q.defer();
            this.isAnimating = true;
            this.hideCalloutElementAsync().then(() => {
                this.calloutScope().$destroy();
                this.nativeCalloutHTMLElement.parentNode.removeChild(this.nativeCalloutHTMLElement);

                this.calloutAugmentedJQuery = null;
                this.calloutScope = null;
                this.closeCalloutScheduledPromise = null;

                this.isAnimating = false;
                deferred.resolve();
            });
            return deferred.promise;
        }

        public closeCalloutScheduledPromise: any = null;

        public defaultCalloutTemplate: string = ["<div>", "<h1>Callout</h1>", "</div>"].join(" ");

        public calloutTemplate: string;

        public calloutScope: any;

    }

    angular.module("app.ui").controller("calloutController", ["$attrs", "$compile", "$element", "$http", "$q", "$scope","$timeout","position" ,CalloutController]);
} 