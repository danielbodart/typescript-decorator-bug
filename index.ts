export function noop(target: any, name: string, descriptor: PropertyDescriptor) {
    console.log(`noop decorator applied to property "${name}"`)
    return target;
    // BUG: this should return the descriptor not the object, but Typescript doesn't type check this
    // return descriptor;
    // Worse is the decorator might still actually work correctly (this was my actual case) except when it
    // decorated a getter called value.
}

export class Works {
    constructor(private readonly _value: number) {
        console.log(`Works constructor called with "${this._value}"`);
    }

    @noop get works() {
        console.log(`Works.works getter called, returning "${this._value}"`);
        return this._value;
    }
}

export class Broken {
    constructor(private readonly _value: number) {
        console.log(`Broken constructor called after getter is called with "${this._value}"`);
    }

    @noop get value() {
        console.log(`Broken.value getter called before constructor is called, returning "${this._value}"`); // returns undefined
        return this._value;
    }
}

const works = new Works(1);
console.log(`works.works returns "${works.works}"`); // returns 1

const broken = new Broken(1);
console.log(`broken.value returns "${broken.value}"`); // returns undefined