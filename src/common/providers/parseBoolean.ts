module App.Common {

    "use strict";

    /**
     * @name parseBoolean
     * @module App.Common
     * @description convert string true or false to boolean value
     */
    export var parseBoolean = (options: any) => {
        return options.value && options.value.toUpperCase() === "TRUE";
    }

    angular.module("app.common").value("parseBoolean", parseBoolean);

} 