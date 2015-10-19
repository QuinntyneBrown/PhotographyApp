declare module App.UI {

    export interface IAppHeaderManager {
        links: Array<any>;
    }

    export interface ICarouselScope extends  ng.IScope {
        slideTemplateUrl:string;
    }
} 