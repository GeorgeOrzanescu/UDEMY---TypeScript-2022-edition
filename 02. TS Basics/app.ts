const person: {
  name: string;
  age: number;
} = {
  name: "George",
  age: 35,
};

// the best way is let TS infer the type
const person1: {
  name: string;
  age: number;
  hobbies: string[];
  role: [number, string, boolean];
} = {
  name: "George",
  age: 35,
  hobbies: ["Sports", "Cooking", "Coding"],
  role: [2, "programmer", true],
};

// person1.role[1] = 4; // this is not allowed because the type don't match

// using enum

enum Role {
  ADMIN,
  USER,
  GUEST,
}

const person2 = {
  name: "George",
  age: 35,
  hobbies: ["Sports", "Cooking", "Coding"],
  role: Role.ADMIN,
};

let favPersons: string[] = ["George", "John", "Jane"];

let anyData: any[] = ["George", 1, 5.8, true];

console.log(person.name);

for (const hobby of person1.hobbies) {
  console.log(hobby.toUpperCase());
}

console.log(
  person1.role[0],
  " is a ",
  person1.role[1],
  "and eligible for promotion: ",
  person1.role[2]
);
