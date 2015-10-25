module App.UI {
    
    "use strict";

    /**
     * @name FileUploadController
     * @module App.UI
     */
    export class FileUploadController {
        
        constructor(private $attrs: ng.IAttributes,
            private $element: ng.IAugmentedJQuery,
            private $http: ng.IHttpService,
            private $scope: ng.IScope) {
            this.bootstrap({ element: $element });
        }

        public onDrop = (dragEvent: DragEvent) => {
            dragEvent.stopPropagation();
            dragEvent.preventDefault();

            if (dragEvent.dataTransfer && dragEvent.dataTransfer.files) {
                this.$http({
                    method: "POST",
                    url: this.$attrs["file-upload-url"],
                    data: { formData: this.packageFiles(dragEvent.dataTransfer.files) },
                    headers: { 'Content-Type': undefined }
                }).then((results) => {
                    this.$scope.$emit("fileUpload", {
                        files: results.data,
                    });
                });
            }
        }

        public packageFiles = (fileList: FileList) => {
            var formData = new FormData();
            for (var i = 0; i < fileList.length; i++) {
                formData.append(fileList[i].name, fileList[i]);
            }
            return formData;
        }

        public bootstrap = (options:any) => {
            var drop = options.element.find(".drop-zone")[0];
            
            drop.addEventListener("dragover", (dragEvent: DragEvent) => {
                dragEvent.stopPropagation();
                dragEvent.preventDefault();
            }, false);

            drop.addEventListener("drop", this.onDrop, false);
        }
        
    }
}