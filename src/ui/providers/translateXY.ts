/// <reference path="../../../typings/typescriptapp.d.ts" />

module App.UI {

    "use strict";

    export var translateXY: ITranslateXY = (options: any) => {

        angular.element(options.element).css({
            "-moz-transform": "translate(" + options.x + "px, " + options.y + "px)",
            "-webkit-transform": "translate(" + options.x + "px, " + options.y + "px)",
            "-ms-transform": "translate(" + options.x + "px, " + options.y + "px)",
            "-transform": "translate(" + options.x + "px, " + options.y + "px)"
        });

        return options.element;

    };

    angular.module("app.ui").value("translateXY", translateXY);
} 