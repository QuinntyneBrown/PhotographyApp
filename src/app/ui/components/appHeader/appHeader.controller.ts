/// <reference path="../../../../../typings/typescriptapp.d.ts" />

module App.UI {

    export class AppHeaderController {
        constructor($injector: ng.auto.IInjectorService, $scope: any) {        
            
            //TODO: use ng-app attribute on body to get the module-name and then append HeaderManager    
            this.appHeaderManager = $injector.get($scope.appHeaderManagerName);
        }

        private _appHeaderManager: IAppHeaderManager;

        public get appHeaderManager() { return this._appHeaderManager; }

        public set appHeaderManager(value: any) { this._appHeaderManager = value; }

        public get links() { return this.appHeaderManager.links; }

    }

    angular.module("app.ui").controller("appHeaderController", ["$injector","$scope",AppHeaderController]);
} 