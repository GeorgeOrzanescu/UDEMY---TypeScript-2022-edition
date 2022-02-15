function add2(n1: number, n2: number): number {
  return n1 + n2; // return type is number
}

function printResult(num: number): void {
  console.log("Result: " + num);
}

function addAndHandle(a: number, b: number, callBack: (num: number) => void) {
  const result = a + b;
  callBack(result);
}

console.log(printResult(add2(5, 12))); // undefined

let pointerToFunction = add2;
console.log(pointerToFunction(5, 12)); // 17

let combineValues: (a: number, b: number) => number;

combineValues = add2; // assign function to variable of type function
// combineValues = 5; // error

console.log(
  addAndHandle(10, 20, (result) => {
    // anonymous function
    return result;
  })
); // undefined
