declare module App.Photographer {
    

    export interface IPhotographerDataService {        
        getFeaturedPhotographer():ng.IPromise<any>
    }

    export interface IPhotographer {
        createInstanceAsync(options: any): ng.IPromise<IPhotographer>;
        fullName:string;
    }

} 