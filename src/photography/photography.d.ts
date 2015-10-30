declare module App.Photography {
    
    /**
    * @name IPhoto
    * @module App.Photography
    */
    export interface IPhoto {
        createInstanceAsync(options: any): ng.IPromise<IPhoto>;
        url:string;
    }

    /**
    * @name IHomeController
    * @module App.Photography
    */
    export interface IHomeController {
        photos: Array<IPhoto>;
    }

    /**
    * @name IPhotoDataService
    * @module App.Photography
    */
    export interface IPhotoDataService {
        getAllFeaturedPhotos():ng.IPromise<any>;
    }

    /**
    * @name IGallery
    * @module App.Photography
    */
    export interface IGallery {
        
    }

    /**
    * @name IGalleryDataService
    * @module App.Photography
    */
    export interface IGalleryDataService {
        
    }

} 