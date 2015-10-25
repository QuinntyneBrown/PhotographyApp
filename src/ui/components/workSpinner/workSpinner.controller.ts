/// <reference path="../../../../typings/typescriptapp.d.ts" />

module App.UI {

    "use strict";

    export class WorkSpinnerController {

        constructor(private requestCounter: Common.IRequestCounter) { }

        public get requestCount() { return this.requestCounter.getRequestCount(); }
    }

    angular.module("app.ui").controller("workSpinnerController", ["requestCounter",WorkSpinnerController]);
}