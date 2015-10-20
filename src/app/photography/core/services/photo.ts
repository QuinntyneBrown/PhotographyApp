module App.Photography {
    
    export class Photo implements IPhoto {
        
        constructor() { }

        private _base64String: string;

        public get base64String() { return this._base64String; }

        public set base64String(value: string) { this._base64String = value; }
    }
}