module App.UI {

    "use strict";

    /**
     * @name Flyout
     * @description
     */
    export class Flyout {
        constructor(private $q: ng.IQService, private extendCssAsync:any) { }

        public createInstance = (options:any) => {
            var instance = new Flyout(this.$q, this.extendCssAsync);

            return instance;
        }

        public initializeAsync = () => {
            var deferred = this.$q.defer();

            this.augmentedJQuery = angular.element("<div></div>");

            this.extendCssAsync({
                nativeHTMLElement: this.nativeElement,
                cssObject: {
                    "transition": "transform .500s cubic-bezier(.10, .10, .25, .90)",
                    "opacity": "100",
                    "position": "fixed",
                    "top": "0", // below clicked triggered element
                    "left": "-100", //negative width
                    "height": "100%", //calc 100% - top
                    "width": "100%", // width
                    "background-color": "rgba(0, 0, 0, .25)", //colour configuraable
                    "display": "block"
                }
            }).then(() => {
                deferred.resolve();
            });

            return deferred.promise;
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

        private augmentedJQuery: ng.IAugmentedJQuery;

        private get nativeElement(): HTMLElement { return this.augmentedJQuery[0]}

    }

    ngX.Component({
        dynamic: true,
        module:"app.ui",
        componentName: "flyout",
        component: Flyout,
        providers: ["$q"]
    });
} 