declare module ngX {
 
    export var Component: Function;

    export var Configure: Function;

    /**
    * @name IRouteResolverServiceProvider
    * @module ngX
    */
    export interface IRouteResolverServiceProvider extends ng.IServiceProvider {

        configure(routePromise: IRoutePromise);

        /**
    * get route promises ordered by priority (ASC)
    * priority 1 runs before priority 10
    */
        routePromises: Array<IRoutePromise>;

        /**
        * Reduce RoutePromises into prioritized groups
        * Put the route promises with the same priority in the same group
        * Eventually will be resolve together asynchronously with $q.all
        */
        reduceRoutePromisesByPriority(routePromises: IRoutePromise[]): Array<IRoutePromisesPrioritizedGroup>;
    }

    /**
    * @name IRouteResolverService
    * @module ngX
    */
    export interface IRouteResolverService {
        resolve(routeName: string): ng.IPromise<any>;
    }

    /**
    * @name IRoutePromise
    * @module ngX
    */
    export interface IRoutePromise {
        priority?: number;
        route?: string;
        promise: any;
        key?: string;
        routes?: Array<string>;
    }

    /**
    * @name IRoutePromiseInstanceOptions
    * @module ngX
    */
    export interface IRoutePromiseInstanceOptions {

    }

    /**
    * @name IRoutePromisesPrioritizedGroup
    * @module ngX
    */
    export interface IRoutePromisesPrioritizedGroup {
        promises: IRoutePromise[];
        priority: number;
        isLast: boolean;
    }


}