module App.Common {

    "use strict";

    export class WindowInnerWidthMonitor {
        
        constructor(private $rootScope:ng.IRootScopeService) {
            window.addEventListener("resize", onResize);
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
        .service("windowInnerWidthMonitor", ["$rootScope", WindowInnerWidthMonitor])
        .run(["windowInnerWidthMonitor", (windowInnerWidthMonitor: any) => {}]);

} 