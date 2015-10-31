module App.Photography {

    "use strict";

    export class RatesController {
        
        public static canActivate = () => {
            return ["$q", ($q:ng.IQService) => { return $q.when(true); }];
        }
    }

    Component({
        module: "app.photography",
        controller: App.Photography.RatesController,
        controllerName: "ratesController",
        injectables:[],
        route: "/rates",
        key:"rates"
    });
}
 