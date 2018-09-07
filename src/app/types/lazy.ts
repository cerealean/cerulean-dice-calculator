export class Lazy<T> {
    private _isInitiated = false;
    private _value: T;

    public get isInitiated() {
        return this._isInitiated;
    }

    public get value(): T{
        if(!this._isInitiated){
            this._value = this.callback();
            this._isInitiated = true;
        }

        return this._value;
    }

    constructor(private callback: (() => T)){}
}