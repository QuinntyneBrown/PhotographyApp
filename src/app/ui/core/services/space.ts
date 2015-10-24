/// <reference path="../../../../../typings/typescriptapp.d.ts" />

module App.UI {

    export class Space implements ISpace {

        constructor() { }

        public above = (spaceNeed: number, rectangle: IRectangle) => {
            return false;
        }

        public below = (spaceNeed: number, rectangle: IRectangle) => {
            return false;
        }

        public left = (spaceNeed: number, rectangle: IRectangle) => {
            return false;
        }

        public right = (spaceNeed: number, rectangle: IRectangle) => {
            return false;
        }
    }

    angular.module("app.ui").service("space", [Space]);
}