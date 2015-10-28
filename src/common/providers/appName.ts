module App.Common {

    var element = <HTMLElement>document.querySelectorAll('[data-ng-app]')[0];

    if(element) var appName = element.getAttribute("data-ng-app");

    angular.module("app.common").value("appName", appName);
} 