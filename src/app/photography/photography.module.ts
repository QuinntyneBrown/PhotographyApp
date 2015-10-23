/// <reference path="../../../typings/typescriptapp.d.ts" />

angular.module("app.photography", [
    "ngAnimate",
    "ngRoute",
    "app.common",
    "app.configuration",
    "app.data",
    "app.security",
    "app.ui"
]);

angular.module("photographyApp", [
    "app.photography"
]).config([
    "$routeProvider", ($routeProvider: ng.route.IRouteProvider) => {
        App.Photography.Routes.Configure($routeProvider);
        App.Security.Routes.Configure($routeProvider);
    }
]).run([
    () => {
        FastClick.attach(document.body);
    }
]);
