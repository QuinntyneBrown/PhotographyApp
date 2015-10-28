module App.UI {

    "use strict";

    /**
     * @name destroyScope
     * @module App.UI
     */
    export var destroyScope = (options: any) => {
        if (options.scope) {
            options.scope.$destroy();
            options.scope = null;
        }
    }

    angular.module("app.ui").value("destroyScope", destroyScope);
} 