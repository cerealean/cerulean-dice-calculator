export class ArgumentError extends Error {
    private __proto__: Error;
    constructor(message?: string){
        const trueProto = new.target.prototype;
        super(message);

        this.__proto__ = trueProto;
    }
}