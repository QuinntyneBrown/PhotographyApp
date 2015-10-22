declare module App.UI {

    export interface IAppHeaderManager {
        links: Array<any>;
    }

    export interface ICarouselScope extends  ng.IScope {
        slideTemplate:string;
    }

    export interface IUploadService {
        uploadFiles(options: any): ng.IPromise<any>;
    }

    export interface IFileUploadController {
        uploadFiles(fileList: FileList, url: string): void;
    }
} 