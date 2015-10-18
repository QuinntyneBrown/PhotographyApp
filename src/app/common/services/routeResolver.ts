module App.Common {

    /**
    * @name RouteResolver
    * @module App.Common
    * @description
    */    
    export class RouteResolverServiceProvider implements IRouteResolverServiceProvider {
        
        constructor() { }

        public configure = (routePromise: IRoutePromise) => {
            this._routePromises.push(routePromise);
        }

        public $get = ["$injector", "$q", ($injector: ng.auto.IInjectorService, $q: ng.IQService) => {
                return {
                    resolve: (routeName: string, routeParams?: ng.route.IRouteParamsService) => {
                        this.routeParams = routeParams;
                        var deferred = $q.defer();
                        var resolvedRouteData: any = {};
                        var routePromises = this.getRoutePromisesByRouteName(routeName);
                        var prioritizedGroups = this.groupRoutePromisesByPriority(routePromises);
                        var priorities: any[] = [];

                        routePromises.forEach((promise) => {
                            if (priorities.indexOf(promise.priority) < 0)
                                priorities.push(promise.priority);
                        });

                        this.invoke($injector, $q, prioritizedGroups, 0, () => {
                            deferred.resolve(resolvedRouteData);
                        }, resolvedRouteData);

                        return deferred.promise;
                    }
                }

            }
        ];

        /* @internal */
        private _routePromises: Array<IRoutePromise> = [];

        private routeParams: any;

        private get routePromises() {
            return this._routePromises.sort((a: IRoutePromise, b: IRoutePromise) => {
                return a.priority - b.priority;
            });
        }

        private getRoutePromisesByRouteName = (roueName: string) => {
            return this._routePromises;
        }

        private get routePromiseGroups() {
            return null;
        }

        /**
         * Group StatePromises by Priority
         */
        private groupRoutePromisesByPriority = (routePromises: IRoutePromise[]) => {

            var priorities: any = [];

            var routePromisesPrioritizedGroups: any[] = [];

            routePromises.forEach((promise) => {
                if (priorities.indexOf(promise.priority) < 0)
                    priorities.push(promise.priority);
            });

            priorities.forEach((priority: number, index: number) => {
                routePromisesPrioritizedGroups.push({
                    promises: routePromises.filter((promise) => { return promise.priority == priority; }),
                    priority: priority,
                    isLast: index == priorities.length - 1
                });
            });

            return routePromisesPrioritizedGroups;
        }

        /**
         * Invoke Group Promises Asynchrounosly.
         * After you reach the last group, call the promise resolve callback
         */
        public invoke = ($injector: ng.auto.IInjectorService, $q: ng.IQService, groups: IRoutePromisesPrioritizedGroup[], currentGroupIndex: number, callback: any, resolvedRouteData: any) => {

            var excutedPromises: any[] = [];

            var currentGroup = groups[currentGroupIndex];

            currentGroup.promises.forEach((statePromise: IRoutePromise) => {
                excutedPromises.push($injector.invoke(statePromise.promise));
            });

            $q.all(excutedPromises).then((results) => {
                results.forEach((result, index) => {
                    if (currentGroup.promises[index].key) {
                        resolvedRouteData[currentGroup.promises[index].key] = results[index];
                    }
                });

                if (currentGroup.isLast) {
                    callback();
                } else {
                    this.invoke($injector, $q, groups, currentGroupIndex + 1, callback, resolvedRouteData);
                }

            });
        }
    }

    angular.module("app.common").provider("routeResolver", [RouteResolverServiceProvider]);
} 