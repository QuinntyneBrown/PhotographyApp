/// <reference path="../../../../typings/typescriptapp.d.ts" />


module App.UI {

    "use strict";

    /**
    * @name SearhBoxController
    * @module App.UI
    */
    export class SearhBoxController {
        
        constructor($scope: ng.IScope, $element: ng.IAugmentedJQuery, $attrs: ng.IAttributes) {
            

        }


    }

    angular.module("app.ui").controller("searhBoxController", ["$scope", "$element","$attrs",SearhBoxController]);
} 