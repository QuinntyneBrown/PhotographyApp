/// <reference path="../../../../../typings/typescriptapp.d.ts" />

module App.UI {

    /**
     * @name Position
     * @module App.UI
     */
    export class Position implements IPosition {

        constructor(private $q: ng.IQService,
            private ruler: IRuler,
            private space: ISpace,
            private translateXY: ITranslateXY) { }

        public somewhere = (a: HTMLElement, b: HTMLElement, space: number, directionPriorityList: Array<string>) => {
            var deferred = this.$q.defer();

            return deferred.promise;
        }

        public above = (a: HTMLElement, b: HTMLElement, space: number) => {
            var deferred = this.$q.defer();
            this.$q
                .all([this.ruler.measure(a), this.ruler.measure(b)])
                .then((resultsArray: Array<IRectangle>) => {
                    var aRectangle = resultsArray[0];
                    var bRectangle = resultsArray[1];
                    this.translateXY({
                        element: b,
                        x: aRectangle.centerX - bRectangle.radiusX,
                        y: aRectangle.bottom + space
                    });

                    deferred.resolve();
                });
            return deferred.promise;
        }

        public below = (a: HTMLElement, b: HTMLElement, space: number) => {
            var deferred = this.$q.defer();
            this.$q
                .all([this.ruler.measure(a), this.ruler.measure(b)])
                .then((resultsArray: Array<IRectangle>) => {
                    var aRectangle = resultsArray[0];
                    var bRectangle = resultsArray[1];
                    this.translateXY({
                        element: b,
                        x: aRectangle.centerX - bRectangle.radiusX,
                        y: aRectangle.bottom + space
                    });
                    deferred.resolve();
                });
            return deferred.promise;
        }

        public left = (a: HTMLElement, b: HTMLElement, space: number) => {
            var deferred = this.$q.defer();
            this.$q
                .all([this.ruler.measure(a), this.ruler.measure(b)])
                .then((resultsArray: Array<IRectangle>) => {
                    var aRectangle = resultsArray[0];
                    var bRectangle = resultsArray[1];
                    this.translateXY({
                        element: b,
                        x: aRectangle.centerX - bRectangle.radiusX,
                        y: aRectangle.bottom + space
                    });
                    deferred.resolve();
                });
            return deferred.promise;
        }

        public right = (a: HTMLElement, b: HTMLElement, space: number) => {
            var deferred = this.$q.defer();
            this.$q
                .all([this.ruler.measure(a), this.ruler.measure(b)])
                .then((resultsArray: Array<IRectangle>) => {
                    var aRectangle = resultsArray[0];
                    var bRectangle = resultsArray[1];
                    this.translateXY({
                        element: b,
                        x: aRectangle.centerX - bRectangle.radiusX,
                        y: aRectangle.bottom + space
                    });
                    deferred.resolve();
                });
            return deferred.promise;
        }


    }

    angular.module("app.ui").service("position", ["$q", "ruler", "space", "translateXY", Position]);
}