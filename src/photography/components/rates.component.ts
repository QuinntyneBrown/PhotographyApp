module App.Photography {

    "use strict";

    /**
     * @name RatesComponent
     * @module App.Photography
     */
    export class RatesComponent {

        constructor(private routeData: any) { }

        public static canActivate = () => {
            return ["$q", ($q:ng.IQService) => { return $q.when(true); }];
        }
    }

    Component({
        module: "app.photography",
        component: RatesComponent,
        componentName: "ratesComponent",
        providers: ["routeData"],
        route: "/rates",
        key:"rates"
    });
}
 