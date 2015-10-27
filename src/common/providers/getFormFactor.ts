/// <reference path="../../../typings/typescriptapp.d.ts" />

module App.Common {

    "use strict";

    var getFormFactor: IGetFormFactor = (): formFactor => {

        if (window.screen.availHeight <= 768) return formFactor.mobile;

        if (window.screen.availHeight <= 1064) return formFactor.tablet;

        return formFactor.desktop;
    }

    angular.module("app.common").value("getFormFactor", getFormFactor);
}
 