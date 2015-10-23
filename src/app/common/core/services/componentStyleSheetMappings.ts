/// <reference path="../../../../../typings/typescriptapp.d.ts" />


module App.Common {

    "use strict";

    /**
     * @name ComponentStyleSheetsMappingsProvider
     * @module App.Common
     */

    export class ComponentStyleSheetsMappingsProvider implements IComponentStyleSheetsMappingsProvider {
    
        constructor() { }

        private _componentStyleSheetMappings: Array<IComponentStyleSheetMapping> = [];

        public configure = (options:any) => {
            this._componentStyleSheetMappings.push(options.mapping);
        }

        public $get:any = [() => {
            getStyleSheetUrlsForComponent: (options: any) => {

            }
        }];
            
    }

} 