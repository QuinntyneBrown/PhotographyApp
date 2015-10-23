declare module App.UI {

    /**
    * @name IAppHeaderManager
    * @module App.UI
    */
    export interface IAppHeaderManager {
        links: Array<any>;
    }

    /**
    * @name ICarouselScope
    * @module App.UI
    */
    export interface ICarouselScope extends  ng.IScope {
        slideTemplate:string;
    }

    /**
    * @name IUploadService
    * @module App.UI
    */
    export interface IUploadService {
        uploadFiles(options: any): ng.IPromise<any>;
    }

    /**
    * @name IFileUploadController
    * @module App.UI
    */
    export interface IFileUploadController {
        uploadFiles(fileList: FileList, url: string): void;
    }
} 