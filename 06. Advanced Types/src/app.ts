interface ErrorContainer {
  [prop: string]: string;
}

const errorBag: ErrorContainer = {
  email: "not a valid email",
  username: "should be at least 3 characters",
};

console.log(errorBag.email, errorBag.username);

// FUNCTION OVERLOADING

function add2(a: number, b: number): number;
function add2(a: string, b: string): string;
function add2(a: Combinable, b: Combinable) {
  // this is a type guard
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

// const result2 = add2("George", "Burdell") as string; // type casting

const result_num = add2(2, 2);
const result_string = add2("George", "Burdell");

result_string.split("");

// OPTIONAL CHAINING

const fetchedUserData = {
  id: "u1",
  name: "Max",
  job: {
    title: "CEO",
    description: "My own company",
  },
};

console.log(fetchedUserData?.job?.title);

// NULLISH COALESCING
const userInputData = null;

const storedData = userInputData ?? "DEFAULT";
// if userInputData is null, storedData will be "DEFAULT"
// ?? is the nullish coalescing operator
