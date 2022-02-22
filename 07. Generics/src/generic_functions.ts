const names = ["John", "Jane", "Mary"];

// build in generics
const arrayString: string[] = names;
const arrayGeneric: Array<string> = []; // are equivalent

const promise: Promise<string> = new Promise((resolve) => {
  setTimeout(() => {
    resolve("Hello");
  }, 1000);
});

// custom generics

function merge<T, U>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

const mergedObj = merge(
  { name: "John", hobbies: ["Tennis", "Swimming"] },
  { age: 30 }
);

console.log(mergedObj);

// CONSTRAINTS

// without constraints u can do this add a second parameter that is not an object
// and TS will not complain and it will silently ignore it
const mergedObj2 = merge({ name: "John", hobbies: ["Tennis", "Swimming"] }, 30);

function merge2<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

// const mergedObj2_constrainted = merge2(
//   { name: "John", hobbies: ["Tennis", "Swimming"] },
//   30
// );  // this will not work TS knows that 30 is not an object

// GENERIC FUNCTION

interface Lengthy {
  length: number;
}

function CountAndPrint<T extends Lengthy>(element: T): [T, string] {
  let description = "Got no value";
  if (element.length > 0) {
    description = `Got ${element.length} elements`;
  }
  return [element, description];
}

console.log(CountAndPrint([1, 2, 3]));

function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return "Value" + obj[key];
}

//extractAndConvert({}, "name"); // this will not work because the object does not have a name property
extractAndConvert({ name: "John" }, "name"); // this will work
