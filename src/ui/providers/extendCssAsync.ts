module App.UI {

    "use strict";

    var $q: ng.IQService = <ng.IQService>angular.injector(['ng']).get("$q");

    /**
     * @name extendCssAsync
     * @module App.UI
     */
    export var extendCssAsync = (options: any) => {        
        return $q.when(angular.extend(options.nativeHTMLElement.style, options.cssObject));
    }

    angular.module("app.ui").value("extendCssAsync", extendCssAsync);
} 