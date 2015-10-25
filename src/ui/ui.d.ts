declare module App.UI {


    /**
     * @name ITranslateXAsync
     * @module App.UI
     */
    export interface ITranslateXAsync {
        (options:any): ng.IPromise<any>;
    }

    /**
     * @name ITranslateXY
     * @module App.UI
     */
    export interface ITranslateXY {
        (options:any):void;
    }

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

    export interface ITemplate {
        get(options: ITemplateGetOptions): ng.IPromise<string>;
    }

    export interface ITemplateGetOptions {
        templateUrl: string;
    }


    export interface IPositionDetachedElement {
        (triggerElement: HTMLElement,
            element: HTMLElement,
            directionPriorityList: string[],
            elementRect: ClientRect,
            alignment: string,
            elementSurroundingWindowSpaceRect: IRect): IPositionDetachedElementResponseDto;

    }

    export interface IPosition {
        below(a: HTMLElement, b: HTMLElement, space?: number): ng.IPromise<any>;
        above(a: HTMLElement, b: HTMLElement, space?: number): ng.IPromise<any>;
        right(a: HTMLElement, b: HTMLElement, space?: number): ng.IPromise<any>;
        left(a: HTMLElement, b: HTMLElement, space?: number): ng.IPromise<any>;
    }

    export interface ISpace {
        below(spaceNeeded: number, rectangle: IRectangle): boolean;
        above(spaceNeeded: number, rectangle: IRectangle): boolean;
        right(spaceNeeded: number, rectangle: IRectangle): boolean;
        left(spaceNeeded: number, rectangle: IRectangle): boolean;
    }


    export interface IRectangleInstanceOptions {
        clientRect?: ClientRect;
        left?: number;
        right?: number;
        top?: number;
        bottom?: number;
        height?: number;
        width?: number;
    }

    export interface IRectangle {
        createInstance(options: IRectangleInstanceOptions): IRectangle;
        left: number;
        right: number;
        top: number;
        bottom: number;
        height: number;
        width: number;
        centerX: number;
        centerY: number;
        middle: IPoint;
        radiusX: number;
        radiusY: number;
    }

    export interface IModalService {
        
    }

    export interface IPoint {
        x: number;
        y: number;
    }

    export interface IRuler {
        measure(element: HTMLElement, detachedFromDom?: boolean): ng.IPromise<IRectangle>;
    }

    export interface IRect {
        top: number;
        left: number;
        right: number;
        bottom: number;
    }

    export interface IPositionDetachedElementResponseDto {
        position: string;
        elementRect: ClientRect;
    }

    export interface IGetHtmlFn {
        (who: HTMLElement, deep: boolean): string
    }
} 