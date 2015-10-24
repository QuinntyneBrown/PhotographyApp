module App.Photography {

    "use strict";

    /**
     * @name RateCalculatorController
     * @module App.Photography
     */
    export class RateCalculatorController {
        
        constructor(private $scope, private $element, private $attrs: ng.IAttributes) { }

    }

    angular.module("app.photography").controller("rateCalculatorController", ["$scope","$element","$attrs",RateCalculatorController]);
} 