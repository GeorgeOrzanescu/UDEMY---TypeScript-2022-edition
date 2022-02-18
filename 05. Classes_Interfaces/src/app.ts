// interfaces are used to define the structure of the object
interface Named {
  readonly name?: string;
  outputName?: string; // optional property

  optionaMethod?(): string; // optional method
}
// inheritance in interfaces
interface Greetable extends Named {
  greet(phrase: string): void;
}

let user1: Greetable;

user1 = {
  name: "Max",

  greet(phrase: string) {
    console.log("Hi, I am " + this.name + " " + phrase);
  },
};

user1.greet("i learn typescript");

// interfaces are used as a contract for a class to implement

class Person implements Greetable {
  name?: string;
  age: number; // u can have other attributes and methods
  constructor(age: number, name?: string) {
    if (name) {
      this.name = name;
    }
    this.age = age;
  }

  greet(phrase: string) {
    if (this.name) {
      console.log("Hi, I am " + this.name + " " + phrase);
    } else {
      console.log("Hi, I am not named" + phrase);
    }
  }

  addYear(year?: number) {
    if (year) {
      this.age += year;
    } else {
      this.age++;
    }
  }
}

const user2 = new Person(35);

user2.greet("i learn typescript");
user2.addYear();
// interfaces with functions

//using type
type AddFn = (a: number, b: number) => number;

const add: AddFn = (a, b: number) => a + b;

// using interface
interface AddFnInterface {
  (a: number, b: number): number;
}

const add2: AddFnInterface = (a, b) => a + b;
