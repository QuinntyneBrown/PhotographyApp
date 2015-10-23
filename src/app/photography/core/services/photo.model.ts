module App.Photography {

    "use strict";

    /**
     * @name Photo
     * @module App.Photography
     */
    export class Photo implements IPhoto {
        
        constructor(private $q: ng.IQService) { }

        public createInstanceAsync = (options: any) => {

            var deferred = this.$q.defer();

            var instance = new Photo(this.$q);

            deferred.resolve(instance);

            return deferred.promise;
        }

        private _base64String: string;

        public get base64String() { return this._base64String; }

        public set base64String(value: string) { this._base64String = value; }

        private _description: string;

        public get description() { return this._description; }

        public set description(value:string) { this._description = value; }

    }

    angular.module("app.photography").service("photo", ["$q",Photo]);
}