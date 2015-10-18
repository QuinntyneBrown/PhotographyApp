/// <reference path="../../../../../typings/typescriptapp.d.ts" />

module Photography {

    export class FeatureCarousel {
        constructor() { }

        public static createInstance = () => {
            return new FeatureCarousel();
        }

        public templateUrl: string = "src/app/photography/components/featureCarousel/featureCarousel.html";

        public restict: string = "E";

        public replace: boolean = true;

        public controllerAs: string = "vm";

        public controller: string = "featureController";

        public link = () => {
            
        }
    }

    angular.module("app.photography").directive("featureCarousel", [FeatureCarousel.createInstance]);
} 