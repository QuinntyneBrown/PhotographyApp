declare module App.Common {
    
    export interface IComponentStyleSheetsMappingsProvider {
        configure(options:any):void;
    }

    export interface IComponentStyleSheetMapping {
        
    }

    export interface IComponentStyleSheetsMappings {
        getStyleSheetsForComponent(options:any):Array<string>;
    }

    /**
     * @name ILoadCss
     * @module App.Common
     * @description load styleSheet if not already loaded
     */
    export interface ILoadStyleSheet {
        (options:any):ng.IPromise<any>
    }
    /**
    * @name IRequestCounter
    * @module App.Common
    */
    export interface IRequestCounter {
        getRequestCount(): number;
    }

    /**
    * @name IRouteResolverServiceProvider
    * @module App.Common
    */
    export interface IRouteResolverServiceProvider extends ng.IServiceProvider {
        configure(routePromise: IRoutePromise);
        routePromises: Array<IRoutePromise>;
        groupRoutePromisesByPriority(routePromises: IRoutePromise[]): Array<IRoutePromisesPrioritizedGroup>;
    }

    /**
    * @name IRouteResolverService
    * @module App.Common
    */
    export interface IRouteResolverService {
        resolve(routeName:string):ng.IPromise<any>;
    }

    /**
    * @name IRoutePromise
    * @module App.Common
    */
    export interface IRoutePromise {
        priority?: number;
        route?:string;
        promise: any;
        key?:string;
    }

    /**
    * @name IRoutePromiseInstanceOptions
    * @module App.Common
    */
    export interface IRoutePromiseInstanceOptions {
        
    }

    /**
    * @name ILocalStorageService
    * @module App.Common
    */
    export interface ILocalStorageService {
        get(options: any): any;
        set(options:any): void;
    }

    /**
    * @name IApiEndpointConfig
    * @module App.Common
    */
    export interface IApiEndpointConfig {
        baseUrls: IEndpointDefinition[];
        getBaseUrl(name?: string): string;
    }

    /**
    * @name IEndpointDefinition
    * @module App.Common
    */
    export interface IEndpointDefinition {
        name?: string;
        url: string;
    }

    /**
    * @name IRoutePromisesPrioritizedGroup
    * @module App.Common
    */
    export interface IRoutePromisesPrioritizedGroup {
        promises: IRoutePromise[];
        priority: number;
        isLast: boolean;
    }

    /**
    * @name IApiEndpointProvider
    * @module App.Common
    */
    export interface IApiEndpointProvider extends ng.IServiceProvider {
        configure(baseUrl: string, name?: string): void;
    }
} 