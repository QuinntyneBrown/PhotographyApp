module App.Data {
    
    export class DataService implements IDataService {

        constructor(private $http: ng.IHttpService, private $q: ng.IQService) { }

        
    }
} 