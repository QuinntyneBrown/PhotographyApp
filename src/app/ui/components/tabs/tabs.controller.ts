/// <reference path="../../../../../typings/typescriptapp.d.ts" />

module App.UI {
 
    "use strict";

    /**
     * @name TabsController
     * @module App.UI
     */       
    export class TabsController {
        constructor(private $scope: any) { }
    }

    angular.module("app.ui").controller("tabsController", ["$scope",TabsController]);
} 