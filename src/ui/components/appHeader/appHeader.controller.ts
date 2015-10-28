/// <reference path="../../../../typings/typescriptapp.d.ts" />

module App.UI {

    export class AppHeaderController {
        constructor(
            private $injector: ng.auto.IInjectorService,
            private $scope: any,
            private appName:string,
            private getFormFactor: Function) {

            $scope.$on("windowInnerWidthChanged", () => { $scope.$digest(); });

        }

        private _appHeaderManager: IAppHeaderManager;

        public get appHeaderManager() {
            if (this._appHeaderManager)
                return this._appHeaderManager;
            this._appHeaderManager = <IAppHeaderManager>this.$injector.get(this.appName + "HeaderManager");
            return this._appHeaderManager;
        }

        public get links() { return this.appHeaderManager.links; }

        public hamburgerButtonClick = () => { }

        public isDeskTop = () => { return this.getFormFactor() === Common.formFactor.desktop; }

        public getMobileMenuTemplateUrl = () => { return this.appHeaderManager.getMobileMenuTemplateUrl(); }

    }

    angular.module("app.ui").controller("appHeaderController", ["$injector", "$scope","appName","getFormFactor", AppHeaderController]);
} 