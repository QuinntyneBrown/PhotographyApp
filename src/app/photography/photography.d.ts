declare module App.Photography {
    
    export interface IPhoto {
        
    }

    export interface IHomeController {
        slideTemplate: string;
        photos: Array<IPhoto>;
    }

    export interface IPhotoDataService {
        getAllFeaturedPhotos():ng.IPromise<any>;
    }

    export interface IGallery {
        
    }

    export interface IGalleryDataService {
        
    }

} 