declare module App.Common {
    
    export interface IRequestCounter {
        getRequestCount(): number;
    }

    export interface IRouteResolverServiceProvider extends ng.IServiceProvider {
        configure(routePromise: IRoutePromise);
    }

    export interface IRouteResolverService {
        resolve(routeName:string):ng.IPromise<any>;
    }

    export interface IRoutePromise {
        priority?: number;
        route?:string;
        promise: any;
        key?:string;
    }

    export interface IRoutePromiseInstanceOptions {
        
    }

    export interface ILocalStorageService {
        get(options: any): any;
        set(options:any): void;
    }

    export interface IApiEndpointConfig {
        baseUrls: IEndpointDefinition[];
        getBaseUrl(name?: string): string;
    }

    export interface IEndpointDefinition {
        name?: string;
        url: string;
    }
    export interface IRoutePromisesPrioritizedGroup {
        promises: IRoutePromise[];
        priority: number;
        isLast: boolean;
    }

    export interface IApiEndpointProvider extends ng.IServiceProvider {
        configure(baseUrl: string, name?: string): void;
    }
} 