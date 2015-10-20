declare module App.Common {
    
    export interface IRequestCounter {
        getRequestCount(): number;
    }

    export interface IRouteResolverServiceProvider extends ng.IServiceProvider {
        
    }

    export interface IRouteResolverService {
        resolve(routeName:string):ng.IPromise<any>;
    }

    export interface IRoutePromise {
        createInstance(options?: IRoutePromiseInstanceOptions): IRoutePromise;
        priority: number;
        promise: any;
        key:string;
    }

    export interface IRoutePromiseInstanceOptions {
        
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