module App.Photography {

    "use strict";

    /**
     * @name RatesController
     * @module App.Photography
     */
    export class RatesController {

        constructor(private routeData: any) { }

        public static canActivate = () => {
            return ["$q", ($q:ng.IQService) => { return $q.when(true); }];
        }
    }

    Component({
        module: "app.photography",
        component: App.Photography.RatesController,
        componentName: "ratesController",
        providers: ["routeData"],
        route: "/rates",
        key:"rates"
    });
}
 