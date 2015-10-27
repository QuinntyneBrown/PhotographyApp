/// <reference path="../../../../typings/typescriptapp.d.ts" />

module App.UI {
 
    "use strict";

    /**
     * @name TabsController
     * @module App.UI
     */       
    export class TabsController {
        constructor(private $scope: any, private $transclude: Function, private getHtml: IGetHtmlFn) {           
            $transclude($scope, (clone: ng.IAugmentedJQuery) => {
                this.clone = clone;
                this.initialRender();
            });
        }

        public initialRender = () => { }

        public clone: ng.IAugmentedJQuery;

        private _templateRef: ng.IAugmentedJQuery;

        public get templateRef() {
            if (this._templateRef)
                return this._templateRef;
            this._templateRef = angular.element(this.getHtml(<HTMLElement>this.clone[0].children[0], true));
            return this._templateRef;
        }
    }

    angular.module("app.ui").controller("tabsController", ["$scope","$transclude",TabsController]);
} 