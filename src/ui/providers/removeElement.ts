module App.UI {

    "use strict";

    /**
     * @name removeElement
     * @module App.UI
     */
    export var removeElement = (options: any) => {
        if (options.nativeHTMLElement) {
            var $target = angular.element(options.nativeHTMLElement);
            options.nativeHTMLElement.parentNode.removeChild(options.nativeHTMLElement);
            $target.remove();
        }
    }

    angular.module("app.ui").value("removeElement", removeElement);
} 