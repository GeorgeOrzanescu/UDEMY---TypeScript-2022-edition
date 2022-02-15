type Combinable = number | string;
type Conversion = "as-number" | "as-text";

function combine(
  input1: Combinable,
  input2: Combinable,
  resultConversion: Conversion
) {
  let result;
  if (typeof input1 === "number" && typeof input2 === "number") {
    result = input1 + input2;
  } else {
    result = input1.toString() + input2.toString();
  }
  if (resultConversion === "as-number") {
    return +result;
  } else {
    return result.toString();
  }
}
// literal type
let is_active: "active" | "inactive";
// aliases on objects

type User = { name: string; age: number };

function greet(user: User) {
  console.log("Hello, " + user.name);
}
const George = { name: "George", age: 30 };
greet(George);

const combinedAges = combine(30, 20, "as-number");
console.log(combinedAges);

const combinedStringAges = combine("30", "20", "as-number");
console.log(combinedStringAges);

const combinedNames = combine("George", "Cristina", "as-text");
console.log(combinedNames);
