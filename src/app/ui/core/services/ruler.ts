/// <reference path="../../../../../typings/typescriptapp.d.ts" />

module App.UI {

    "use strict";

    /**
     * @name Ruler
     * @module App.UI
     */
    export class Ruler implements IRuler {

        constructor(private $document: ng.IDocumentService, private $q: any, private $timeout: ng.ITimeoutService, private rectangle: IRectangle) { }

        public measure = (element: HTMLElement): ng.IPromise<IRectangle> => {
            var deferred = this.$q.defer();
            var documentRef: Document = (<any>angular.element(this.$document))[0];

            if (documentRef.body.contains(element)) {
                deferred.resolve(this.rectangle.createInstance({ clientRect: element.getBoundingClientRect() }));
            } else {
                this.$timeout(() => {
                    documentRef.body.appendChild(element);
                    var clientRect = element.getBoundingClientRect();
                    element.parentNode.removeChild(element);
                    deferred.resolve(this.rectangle.createInstance({ clientRect: clientRect }));
                }, 0, false);
            }
            return deferred.promise;
        }
    }

    angular.module("app.ui").service("ruler", ["$document", "$q", "$timeout", "rectangle", Ruler]);

}