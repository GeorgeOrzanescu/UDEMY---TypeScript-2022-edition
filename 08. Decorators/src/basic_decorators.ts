// a decorator is a function that u apply to something in a certain way

// convention is to use upper case for decorators
// decorators receive arguments
// DECORATOR
function Logger(constructor: Function) {
  console.log("Logging...");
  console.log(constructor);
}
// DECORATOR FACTORY
function Logger2(logString: string) {
  // a function that returns a decorator
  return function (target: Function) {
    {
      console.log("Logging..." + logString);
      console.log(target);
    }
  };
}

function WithTemplate(template: string, hookId: string) {
  return function (_: Function) {
    // _  says we don't care about the target omit it
    console.log("Rendering template");
    const hookEl = document.getElementById(hookId);
    if (hookEl) {
      hookEl.innerHTML = template;
    }
  };
}

// @Logger2("Person") // now we have to execute the decorator factory
// class Person {
//   name = "George";

//   constructor() {
//     console.log("Creating person object");
//   }
// }
@Logger2("Person")
@WithTemplate("<h1>My Person Object</h1>", "app") // now we have to execute the decorator factory
class Person {
  name = "George";

  constructor() {
    console.log("Creating person object");
  }
}

const person = new Person();

console.log(person);

// Property decorators

function Log(target: any, propertyName: string | Symbol) {
  console.log("Property decorator");
  console.log(target, propertyName);
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log("Accessor decorator");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log3(
  target: any,
  name: string | symbol,
  descriptor: PropertyDescriptor
) {
  console.log("Method decorator");
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log4(target: any, name: string | Symbol, position: number) {
  console.log("Parameter decorator");
  console.log(target);
  console.log(name);
  console.log(position);
}

class Product {
  @Log
  title: string;
  private _price: number;

  // setter
  @Log2
  set price(val: number) {
    if (val < 0) {
      throw new Error("Invalid price - should be positive");
    }
    this._price = val;
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }
  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}

const p1 = new Product("Book1", 32);
const p2 = new Product("Book2", 22);
