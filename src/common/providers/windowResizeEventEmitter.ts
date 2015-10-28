module App.Common {

    "use strict";

    /**
     * @name WindowResizeEventEmitter
     * @module App.Common
     */
    export class WindowResizeEventEmitter {
        
        constructor(private $rootScope: ng.IRootScopeService, private debounce: any) {
            window.addEventListener("resize", debounce(onResize,300));
            var self = this;
            function onResize() {
                if (self.innerWidth != window.innerWidth) {
                    self.innerWidth = window.innerWidth;
                    $rootScope.$broadcast("windowInnerWidthChanged");
                }
            }
        }

        public innerWidth: number = null;
    }

    angular.module("app.common")
        .service("windowResizeEventEmitter", ["$rootScope", "debounce", WindowResizeEventEmitter])
        .run(["windowResizeEventEmitter", (windowResizeEventEmitter: any) => {}]);

} 