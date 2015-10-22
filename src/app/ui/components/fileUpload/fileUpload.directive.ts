/// <reference path="../../../../../typings/typescriptapp.d.ts" />

module App.UI {
    
    /**
     * @name fileUpload
     * @module App.UI
     */
    export class FileUpload {
        constructor(private $rootScope: ng.IRootScopeService, private uploadService: IUploadService) {}

        public static createInstance = ($rootScope: ng.IRootScopeService, uploadService: IUploadService) => {
            return new FileUpload($rootScope, uploadService);
        }

        public template: string = [
            "<div>",
            '<div class="drop-zone">Drop your files here!</div>',
            "</div>"
        ].join("");

        public restrict: string = "E";

        public replace: boolean = true;

        public scope: any = {};

        public link = (scope: any, element: ng.IAugmentedJQuery, attributes: ng.IAttributes, controller: any) => {
            var drop = element.find(".drop-zone")[0];
            var uploadService = this.uploadService;
            drop.addEventListener("dragover",(dragEvent:DragEvent) => {
                dragEvent.stopPropagation();
                dragEvent.preventDefault();
            }, false);

            drop.addEventListener("drop", onDrop, false);

            function onDrop(dragEvent: DragEvent) {
                dragEvent.stopPropagation();
                dragEvent.preventDefault();
                
                if (dragEvent.dataTransfer && dragEvent.dataTransfer.files) {                    
                    uploadService.uploadFiles({ formData: packageFiles(dragEvent.dataTransfer.files), url: attributes["url"] }).then((results) => {
                        scope.$emit("fileUpload", {
                            files: results.data,
                        });
                    });                    
                }
            }

            function packageFiles(fileList: FileList) {
                var formData = new FormData();
                for (var i = 0; i < fileList.length; i++) {
                    formData.append(fileList[i].name, fileList[i]);
                }
                return formData;
            }
        }

    }

    angular.module("app.ui").directive("fileUpload", ["$rootScope", "uploadService", FileUpload.createInstance]);
} 