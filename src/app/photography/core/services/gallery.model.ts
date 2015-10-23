﻿module App.Photography {
    
    /**
     * @name Gallery
     * @module App.Photography
     */
    export class Gallery implements IGallery {

        constructor(private $q: ng.IQService) { }

        public createInstanceAsync = (options: any) => {

            var deferred = this.$q.defer();

            var instance = new Photo(this.$q);

            deferred.resolve(instance);

            return deferred.promise;
        }

        private _photos: Array<IPhoto>;

        public get photos() { return this._photos; }

        public set photos(value: Array<IPhoto>) { this._photos = value; }

        private _description: string;

        public get description() { return this._description; }

        public set description(value: string) { this._description = value; }

        private _title: string;

        public get title() { return this._title; }

        public set title(value: string) { this._title = value; }
    }

    angular.module("app.photography").service("gallery", ["$q",Gallery]);
}