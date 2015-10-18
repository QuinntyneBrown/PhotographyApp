module App.Photography {

    export class RateCalculator {

        public static createInstance = () => {
            return new RateCalculator();
        }

        public templateUrl: string = "";

        public restrict: string = "E";

        public replace: boolean = true;

        public controller: string = "rateCalculatorController";

        public controllerAs: string = "vm";

        public link = (scope:ng.IScope, element: ng.IAugmentedJQuery, attributes:ng.IAttributes) => {
            
        }

    }

    angular.module("app.photography").directive("rateCalculator", [RateCalculator.createInstance]);
} 