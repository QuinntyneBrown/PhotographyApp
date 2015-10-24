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
            private $scope: any) {

            this.bootstrap($element);

            $scope.$on("$destroy", () => {
                
            });
        }

        public calloutAugmentedJQuery: ng.IAugmentedJQuery;

        public get nativeCalloutHTMLElement() { return this.calloutAugmentedJQuery[0]; }

        public bootstrap = ($element: ng.IAugmentedJQuery) => {
            var nativeElement = $element[0];
            nativeElement.addEventListener(this.$attrs["triggerEvent"] || "click", () => {
                if (!this.isAnimating) {
                    
                }
            });
        }

        public get nativeOriginalHTMLElement() { return this.$element[0]; } 

        public isOpen: boolean = false;

        public isAnimating: boolean = false;


        public get openPromises() {
            return [

            ];
        }

        public closeSequenceAsync = () => {
            
        }

        public openAsync = () => {
            var deferred = this.$q.defer();
            this.isAnimating = true;
            
            if (this.$attrs["calloutTemplateUrl"]) {
                this.$http({ method: "GET", url: this.$attrs["calloutTemplateUrl"]}).then((results) => {

                });
            } else {
                
            }

            return deferred.promise;

        }

        public defaultCalloutTemplate: string = ["<div>", "<h1>Callout</h1>", "</div>"].join(" ");

        public closeAsync = () => {
            var deferred = this.$q.defer();
            this.isAnimating = true;

            return deferred.promise;
        }
    }

    angular.module("app.ui").controller("calloutController", ["$attrs", "$compile", "$element", "$http", "$q", "$scope", CalloutController]);
} 