/// <reference path="../../../typings/typescriptapp.d.ts" />

angular.module("app.photography", [
    "ngRoute",
    "app.common",
    "app.data",
    "app.security"
]);

angular.module("photographyApp", [
    "app.photography"
]).config([
    "$routeProvider", ($routeProvider: ng.route.IRouteProvider) => {
        Photography.Routes.Configure($routeProvider);
}]);