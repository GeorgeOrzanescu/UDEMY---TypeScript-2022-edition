// decorator that binds automatically that method on the class
function Autobind(_: any, _2: string | symbol, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      // add getter
      const boundFn = originalMethod.bind(this); // bind the object to the method
      return boundFn; // return the bound function
    },
  };
  return adjDescriptor;
}

class Printer {
  message = "This works!";
  @Autobind
  showMessage() {
    console.log(this.message);
  }
}

const p = new Printer();

const button = document.querySelector("button")!;
// button.addEventListener("click", p.showMessage.bind(p)); // one way of making it work JS style

button.addEventListener("click", p.showMessage); // another way of making it work because of the decorator

// Decorator used for validation

interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[]; // ['required', 'positive']
  };
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    [propName]: ["required"],
  };
}

function PozitiveNum(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    [propName]: ["positive"],
  };
}

function validate(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  if (!objValidatorConfig) {
    return true;
  }
  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case "required":
          return !!obj[prop];

        case "positive":
          return obj[prop] > 0;
      }
    }
  }
  return true;
}

class Course {
  @Required
  title: string;
  @PozitiveNum
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector("form")!;
courseForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const titleEl = document.getElementById("title") as HTMLInputElement;
  const priceEl = document.getElementById("price") as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value;

  const createdCourse = new Course(title, price);

  if (!validate(createdCourse)) {
    throw new Error("Invalid input, please try again");
  }
  console.log(createdCourse);
});
