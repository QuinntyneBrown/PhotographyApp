module App {
    
    /**
     * @name Pipe
     * @description syntax sugar to ease transition to angular 2
     */
    export var Pipe = (options: any) => {
        angular.module(options.module).filter(options.pipeName, options.pipe);
    }
} 