declare module App.Photography {
    
    export interface IPhoto {
        
    }

    export interface IHomeController {
        slideTemplate: string;
        photos:Array<IPhoto>;
    }

    export interface IPhotographyDataService {
        getAllFeaturedPhotos():ng.IPromise<any>;
    }
} 