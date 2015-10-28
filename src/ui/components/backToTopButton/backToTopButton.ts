module App.UI {

    "use strict";

    //http://www.uxplore.ca/#/

    /**
    * @name BackToTopButton
    * @module App.UI
    */
    export class BackToTopButton {
        
        constructor(private $q: ng.IQService,
            private appendToBodyAsync: any,
            private debounce: any,
            private extendCssAsync: any,
            private removeElement: any,
            private setOpacityAsync: any) {

        }

        public bootstrap = () => { window.addEventListener("scroll", this.debounce(() => { this.onScroll(); }, 100)); }

        public onScroll = () => {
            
        }

        public initializeAsync = () => {
            
        }

        public showAsync = () => {

        }

        public hideAsync = () => {

        }

        public dispose = () => {
            
        }

        public onClick = () => {
            
        }

        public isOpen: boolean = false;

        public isAnimating: boolean = false;
    }

    angular.module("app.ui").service("backToTopButton", ["$q", "appendToBodyAsync", "debounce", "extendCssAsync", "removeElement","setOpacityAsync",BackToTopButton]);
} 