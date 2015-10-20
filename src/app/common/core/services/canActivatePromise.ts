module App.Common {
    
    export class CanActivatePromise implements IRoutePromise {
        
        public createInstance = () => {
            return new CanActivatePromise();
        }

        private _key: string;

        public get key() { return this._key; }

        public set key(value: any) { this._key = value; }

        private _priority: number;

        public get priority() { return this._priority; }

        public set priority(value: number) { this._priority = value; }

        private _promise: any;

        public get promise() { return this._promise; }

        public set promise(value: any) { this._promise = value; }

    }
} 