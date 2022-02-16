// LET CONST AND VAR
const name2: string = "George";

let age2: number = 30;

// global and function scope only for var

var myName: string = "John";

if (true) {
  var myAge: number = 30;
}

console.log(myAge); //we have access to the var

// if (true) {
//   let myAge2: number = 30;
// }

// console.log(myAge2); // we don't have access to the let

// ARROW FUNCTIONS
const subtract = (a: number, b: number): number => {
  return a - b;
};

// implicit return shorthand
const subtract2 = (a: number, b: number) => a - b;

const buttonListener = document.querySelector("button");
buttonListener?.addEventListener("click", (event) => console.log(event));

console.log(subtract(10, 5));

// DEFAULT FUNCTION PARAMETERS

// default arguments must be at the end
const displayFullName = (firstName: string, lastName: string = "Smith") => {
  console.log(firstName + " " + lastName);
};

displayFullName("John");

// SPREAD OPERATOR

const array1 = [1, 2, 3];
const array2 = [4, 5, 6, ...array1];

const person1 = {
  firstName: "John",
  lastName: "Doe",
  age: 30,
};

const newPerson = { ...person1 };

console.log(newPerson.age);

// REST PARAMETERS

const displayHobbies = (...hobbies: string[]) => {
  console.log(hobbies);
};

const multiply = (...numbers: number[]) => {
  return numbers.reduce((acc, curr) => acc * curr, 1);
};
displayHobbies("Cooking", "Sports", "Coding");
console.log(multiply(1, 2, 3, 4, 5));

const presentation = (...args: [string, number, string]) => {
  let [firstName, age, job] = args;

  console.log(`${firstName} is ${age} years old and works as a ${job}`);
};

presentation("John", 30, "teacher");

// ARRAY AND OBJECT DESTRUCTURING

let friends = ["Bob", "Jane", "Mark"];

// this will destructure the first 2 elements in the array in order
const [firstFriend, secondFriend] = friends;
console.log(firstFriend, secondFriend);

let Movie = {
  title: "Avengers",
  year: 2019,
  cast: ["Robert Downey Jr", "Chris Evans", "Chris Hemsworth"],
  director: "Anthony Russo",
  rating: 8.5,
};

const { title, year, cast, director, rating } = Movie;

console.log(
  `${title} was released in ${year} and was directed by ${director}. The cast was ${cast} and the rating was ${rating}`
);
