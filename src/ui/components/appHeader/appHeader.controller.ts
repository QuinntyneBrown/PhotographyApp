/// <reference path="../../../../typings/typescriptapp.d.ts" />

module App.UI {

    "use strict";

    /**
     * @name AppHeaderController
     * @module App.UI
     */
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

    Component({        
        module: "app.ui",
        component: AppHeaderController,
        componentName: "appHeaderController",
        selector: "app-header",
        providers: ["$injector", "$scope", "appName", "getFormFactor"],
        template: [
            "<div class='app-header'>",
            "<div data-ng-if='vm.isDeskTop()'>",
            "<a href='{{ ::link.url }}' data-ng-repeat='link in vm.links'>{{ ::link.caption }}</a>",
            "</div>",
            "<div data-ng-if='!vm.isDeskTop()'>",
            "<hamburger-button callout callout-templateUrl='vm.getMobileMenuTemplateUrl()'></hamburger-button>",
            "</div>",
            "</div>"
        ].join(" ")
    });

    
} 