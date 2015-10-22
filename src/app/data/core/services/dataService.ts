module App.Data {
    
    /**
     * @name DataService
     */
    export class DataService implements IDataService {

        constructor(private $http: ng.IHttpService, private $q: ng.IQService, private localStorage) { }

        public fromServiceOrCache = (options:any) => {
            var deferred = this.$q.defer();
            this.$http({ method: options.method, url: options.url }).then((results) => {
                deferred.resolve(results);
            });
            return deferred.promise;
        }

        public fromService = (options: any) => {
            var deferred = this.$q.defer();
            this.$http({ method: options.method, url: options.url }).then((results) => {
                deferred.resolve(results);
            });
            return deferred.promise;            
        }
    }

    angular.module("app.data").service("dataService", ["$http", "$q", "localStorage", DataService]);
} 