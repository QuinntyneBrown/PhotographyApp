/// <reference path="../../../../typings/typescriptapp.d.ts" />

module App.UI {

    "use strict";

    /**
     * @name SearhBox
     * @module App.UI
     */
    export class SearchBox {

        public static createInstance = () => { return new SearchBox(); }

        public template: string = [
            "<div class='search-container'>",
            "<form name='searchForm'>",
            "<input></input>",
            "</form>",
            "</div>"
        ].join(" ");

        public styleUrls: Array<string> = [""]

        public replace: boolean = true;

        public restrict: string = "E";

        public controller: string = "searchBoxController";

        public controllerAs: string = "vm";
    }

    angular.module("app.ui").directive("searchBox", [SearchBox.createInstance]);

} 