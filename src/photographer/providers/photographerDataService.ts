module App.Photographer {
    "use strict";

    /**
     * @name PhotographerDataService
     * @module App.Photographer
     */
    export class PhotographerDataService implements IPhotographerDataService {

        constructor(private $q: ng.IQService) { }

        public getFeaturedPhotographer = () => {
            return this.$q.when({ data: {
                fullName: "Quinntyne Brown"
            } });
        }

    }

    angular.module("app.photographer").service("photographerDataService", ["$q",PhotographerDataService]);
} 