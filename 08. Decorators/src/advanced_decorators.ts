// Version 1 basic decorator with target parameter  (target is the constructor function)
function WithTemplate1(constructor: Function) {
  console.log("BASIC DECORATOR");
  console.log(constructor.prototype);
}
// Version 2 decorator factory that returns a decorator
function WithTemplate2(name: string, age: number) {
  console.log("TEMPLATE2 FACTORY");
  return (_: any) => {
    // omit the target parameter
    const hookEl = document.getElementById("app");

    if (hookEl) {
      hookEl.innerHTML = `<h1>${name} is ${age} years old</h1>`;
    }
  };
}

// Version3 more advanced decorator factory that returns a decorator and uses
// target/constructor attributes
function WithTemplate3(template: string, hookId: string, name: string) {
  console.log("TEMPLATE3 FACTORY");
  return function (constructor: any) {
    console.log("Rendering Template");
    const hookEl = document.getElementById(hookId)!.querySelector("#message");
    const nameholder = document.getElementById(hookId)!.querySelector("#name");
    const s = new constructor(name);

    if (hookEl && nameholder) {
      hookEl.innerHTML = template;
      nameholder.innerHTML = s.name;
    }
  };
}
// Version 4 decorator that has a return value
// in this decorator for a class we want to return a new constructor function
// that replaces the original constructor function
function WithTemplate4(template: string, hookId: string, name: string) {
  console.log("TEMPLATE4 FACTORY");
  return function <T extends { new (...args: any[]): { name: string } }>(
    originalConstructor: T
  ) {
    console.log("Rendering Template");
    const hookEl = document.getElementById(hookId)!.querySelector("#message");
    const nameholder = document.getElementById(hookId)!.querySelector("#name");
    const s = new originalConstructor(name);

    if (hookEl && nameholder) {
      hookEl.innerHTML = template;
      nameholder.innerHTML = s.name;
    }
    return class extends originalConstructor {
      constructor(...args: any[]) {
        super(name);
        args.forEach((arg: any) => {
          console.log(arg);
        });
      }
    };
  };
}
@WithTemplate4("Hello my neighbours", "app", "George")
class Student {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

const s1 = new Student("George");
