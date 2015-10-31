module App.Photographer {

    "use strict";

    /**
     * @name Photographer
     * @module App.Photographer
     */
    export class Photographer implements IPhotographer {
        constructor(private $q: ng.IQService) { }
          
        public createInstanceAsync = (options:any) => {
            var instance = new Photographer(this.$q);
            instance.fullName = options.data.fullName;
            return this.$q.when(instance);
        }

        private _fullName: string;

        public get fullName() { return this._fullName; }

        public set fullName(value:string) { this._fullName = value; }
    }

    angular.module("app.photographer").service("photographer", ["$q",Photographer]);
} 