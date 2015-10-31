﻿/// <reference path="../../typings/typescriptapp.d.ts" />

angular.module("app.photography", [
    "ngAnimate",
    "ngRoute",
    "app.common",
    "app.configuration",
    "app.data",
    "app.photographer",
    "app.security",
    "app.ui"
]);

angular.module("photographyApp", [
        "app.photography"
    ]).config([
        "$routeProvider", "apiEndpointProvider", (
            $routeProvider: ng.route.IRouteProvider,
            apiEndpointProvider: App.Common.IApiEndpointProvider) => {

            App.Photographer.PhotographerRoutes.Configure($routeProvider);
            App.Photography.PhotographyRoutesRoutes.Configure($routeProvider);
            App.Security.SecurityRoutes.Configure($routeProvider);

            apiEndpointProvider.configure("http://configurationapi.azurewebsites.net/api", "configuration");
            apiEndpointProvider.configure("http://photographyapi.azurewebsites.net/api", "photography");
            apiEndpointProvider.configure("http://qbsecurityapi.azurewebsites.net/api", "security");

        }
    ])
    .run([() => {FastClick.attach(document.body);} ])
    .run(["backToTopButton", (backToTopButton: any) => { backToTopButton.bootstrap(); }]);
