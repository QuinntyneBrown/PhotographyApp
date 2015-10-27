/// <reference path="../../../typings/typescriptapp.d.ts" />

module App.Common {

    "use strict";

    var getFormFactor: IGetFormFactor = (): formFactor => {

        var width = window.innerWidth;

        if (width <= 768) return formFactor.mobile;

        if (width <= 1064) return formFactor.tablet;

        return formFactor.desktop;
    }

    angular.module("app.common").value("getFormFactor", getFormFactor);
}
 