abstract class Department {
  // private readonly id: string;
  // private name: string;
  static fiscalYear = 2022;
  protected employees: string[] = [];

  constructor(private readonly id: string, public name: string) {}

  abstract describe(this: Department): void;

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
    console.log(this.id);
  }
  // static class method
  static createEmployee(name: string) {
    return { name: name }; // return on object
  }
}

// const accounting = new Department("2", "Accounting");
// accounting.addEmployee("George");
// accounting.addEmployee("Maria");

// //accounting.employees[0] = "Anna"; //error this is private property
// accounting.printEmployeeInformation();
// accounting.describe();

// const accountingCopy = { name: "DUMMY", describe: accounting.describe };

// this is usually the object that calls the method
// accountingCopy.describe();
