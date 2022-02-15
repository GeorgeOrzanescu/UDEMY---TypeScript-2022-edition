function add(n1: number, n2: number, showResult: boolean, phrase: string) {
  //   if (typeof n1 === "number" && typeof n2 === "number") {
  //     return n1 + n2;
  //   } else {
  //     throw new Error("Invalid Input");
  //   }
  if (showResult) {
    console.log(phrase + (n1 + n2));
    return n1 + n2;
  } else {
    console.log(phrase + "no result shown");
    return 0;
  }
}
// floats, double etc are all stored as number type (actually as floats)
const number1 = 5;
const number2 = 20;

let num;

let num2: number; // so TS know that this is a number

const printResult = true;

let resultPhrase = "Result is: ";

const result = add(number1, number2, printResult, resultPhrase);

console.log(result);
