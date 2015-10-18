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
        App.Photography.Routes.Configure($routeProvider);
        App.Security.Routes.Configure($routeProvider);
}]);