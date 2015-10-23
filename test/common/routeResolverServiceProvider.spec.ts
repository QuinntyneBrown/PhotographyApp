/// <reference path="../../typings/typescriptapp.d.ts" />

module App.Common {

    describe("routeResolverServiceProvider", () => {

        var routeResolverServiceProvider: IRouteResolverServiceProvider;
        var scope: any;
        var routeData: any;
        var $injector: any;

        beforeEach(() => {
            angular.module("app.common");
            routeResolverServiceProvider = new App.Common.RouteResolverServiceProvider();
            routeData = null;
        });

        beforeEach(inject(($rootScope: any, _$injector_: any) => {
            scope = $rootScope.$new();
            $injector = _$injector_;
        }));

        it("should be defined", () => {
            expect(routeResolverServiceProvider).toBeDefined();
        });

        it("should be have 0 promises", () => {
            expect(routeResolverServiceProvider.routePromises).toEqual([]);
        });

        it("should be have 1 promise if configured with 1 promise", () => {

            routeResolverServiceProvider.configure({
                priority: 1,
                state: "default",
                promise: [
                    "$q", ($q: ng.IQService) => { return $q.when(true); }]
            });

            expect(routeResolverServiceProvider.routePromises.length).toEqual(1);
        });

        it("should be have 1 promise if configured with 1 promise and resolve", () => {

            routeResolverServiceProvider.configure({
                priority: 1,
                state: "default",
                key: "testRouteData",
                promise: [
                    "$q", ($q: ng.IQService) => {
                        routeData = 1;
                        return $q.when(routeData);
                    }]
            });

            expect(routeResolverServiceProvider.routePromises.length).toEqual(1);

            var routeResolverService = $injector.invoke(routeResolverServiceProvider.$get);

            expect(routeResolverService).toBeDefined();

            expect(routeData).toBeFalsy();

            routeResolverService.resolve("default");

            scope.$digest();

            expect(routeData).toEqual(1);

        });

        it("it should group route promises by priority", () => {

            var routePromises: any[] = [];

            routePromises.push({
                priority: 1,
                state: "default",
                key: "testRouteData",
                promise: [
                    "$q", ($q: ng.IQService) => {
                        routeData = 1;
                        return $q.when(routeData);
                    }]
            });

            routePromises.push({
                priority: 2,
                state: "default",
                key: "testRouteData",
                promise: [
                    "$q", ($q: ng.IQService) => {
                        routeData = routeData + 1;
                        return $q.when(routeData);
                    }]
            });

            routePromises.push({
                priority: 1,
                state: "default",
                key: "testRouteData",
                promise: [
                    "$q", ($q: ng.IQService) => {
                        routeData = 1;
                        return $q.when(routeData);
                    }]
            });

            routePromises.push({
                priority: 2,
                state: "default",
                key: "testRouteData",
                promise: [
                    "$q", ($q: ng.IQService) => {
                        routeData = routeData + 1;
                        return $q.when(routeData);
                    }]
            });

            var result = routeResolverServiceProvider.groupRoutePromisesByPriority(routePromises);

            expect(result.length).toEqual(2);
            expect(result[1].isLast).toEqual(true);
        });

        it("should be have 2 promises if configured with 2 promises and resolve data", () => {

            routeResolverServiceProvider.configure({
                priority: 1,
                state: "default",
                key: "testRouteData",
                promise: [
                    "$q", ($q: ng.IQService) => {
                        routeData = 1;
                        return $q.when(routeData);
                    }]
            });

            routeResolverServiceProvider.configure({
                priority: 2,
                state: "default",
                key: "testRouteData",
                promise: [
                    "$q", ($q: ng.IQService) => {
                        routeData = routeData + 1;
                        return $q.when(routeData);
                    }]
            });

            expect(routeResolverServiceProvider.routePromises.length).toEqual(2);

            var routeResolverService = $injector.invoke(routeResolverServiceProvider.$get);
            var routeDataResult: any;
            expect(routeResolverService).toBeDefined();

            expect(routeData).toBeFalsy();

            routeResolverService.resolve("default").then((results: any) => {
                routeDataResult = results;
            });

            scope.$digest();

            expect(routeData).toEqual(2);

            expect(routeDataResult.testRouteData).toEqual(2);

        });
    });
} 