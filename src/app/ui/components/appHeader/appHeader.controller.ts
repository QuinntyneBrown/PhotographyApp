/// <reference path="../../../../../typings/typescriptapp.d.ts" />

module App.UI {

    export class AppHeaderController {
        constructor($injector: ng.auto.IInjectorService, $scope: any) {        
            
            var element = <HTMLElement>document.querySelectorAll('[data-ng-app]')[0];
            var appName = element.getAttribute("data-ng-app");
            this.appHeaderManager = $injector.get(appName + "HeaderManager");
        }

        private _appHeaderManager: IAppHeaderManager;

        public get appHeaderManager() { return this._appHeaderManager; }

        public set appHeaderManager(value: any) { this._appHeaderManager = value; }

        public get links() { return this.appHeaderManager.links; }

    }

    angular.module("app.ui").controller("appHeaderController", ["$injector","$scope",AppHeaderController]);
} 