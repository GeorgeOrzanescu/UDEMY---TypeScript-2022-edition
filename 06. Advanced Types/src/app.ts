// Code goes here!

type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};
// using intersection type
type ElevetedEmployee = Admin & Employee;

const e1: ElevetedEmployee = {
  name: "Max",
  privileges: ["create-server"],
  startDate: new Date(),
};

console.log(e1.privileges);

type Combinable = string | number;
type Numeric = number | boolean;

type universal = Combinable & Numeric;

let result: universal = 2;

// type guard  helps with union types

function add(a: Combinable, b: Combinable) {
  // this is a type guard
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

type UnknownEmployee = Employee | Admin;

function printEmployeeInfo(emp: UnknownEmployee) {
  console.log("Name " + emp.name);
  if ("privileges" in emp) {
    console.log("privilages " + emp.privileges);
  }
  if ("startDate" in emp) {
    console.log("start date " + emp.startDate);
  }
}

printEmployeeInfo(e1);

class Car {
  drive() {
    console.log("Driving...");
  }
}

class Truck {
  drive() {
    console.log("Driving a truck...");
  }

  loadCargo(amount: number) {
    console.log("Loading cargo " + amount);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();

  if (vehicle instanceof Truck) {
    vehicle.loadCargo(100);
  }
}

// discriminated union

interface Bird {
  type: "bird";
  flyingSpeed: number;
}

interface Horse {
  type: "horse";
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  switch (animal.type) {
    case "bird":
      console.log("Flying with speed " + animal.flyingSpeed);
      break;
    case "horse":
      console.log("Moving with speed " + animal.runningSpeed);
      break;
  }
}

moveAnimal({ type: "bird", flyingSpeed: 10 });

//type casting

// first option
// const userInput = <HTMLInputElement>document.getElementById("user-input");
// second option
const userInput = document.getElementById("user-input")! as HTMLInputElement;

userInput.value = "Hello World";
