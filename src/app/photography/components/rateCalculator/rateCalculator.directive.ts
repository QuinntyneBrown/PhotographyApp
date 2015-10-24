module App.Photography {

    export class RateCalculator {

        public static createInstance = () => { return new RateCalculator(); }

        public templateUrl: string = "src/app/photography/components/rateCalculator/rateCalculator.html";

        public static styleUrls: Array<string> = ["src/app/photography/components/rateCalculator/rateCalculator.css"];

        public restrict: string = "E";

        public replace: boolean = true;

        public controller: string = "rateCalculatorController";

        public controllerAs: string = "vm";
    }

    angular.module("app.photography").directive("rateCalculator", [RateCalculator.createInstance]);
} 