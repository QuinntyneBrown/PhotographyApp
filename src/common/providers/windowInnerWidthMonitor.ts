module App.Common {

    "use strict";

    export class WindowInnerWidthMonitor {
        
        constructor(private $rootScope: ng.IRootScopeService, private debounce: any) {

            window.addEventListener("resize", debounce(onResize,300));

            var self = this;

            function onResize() {
                if (self.innerWidth != window.innerWidth) {
                    self.innerWidth = window.innerWidth;
                    $rootScope.$digest();
                }
            }
        }

        public innerWidth: number = null;

    }

    angular.module("app.common")
        .service("windowInnerWidthMonitor", ["$rootScope","debounce", WindowInnerWidthMonitor])
        .run(["windowInnerWidthMonitor", (windowInnerWidthMonitor: any) => {}]);

} 