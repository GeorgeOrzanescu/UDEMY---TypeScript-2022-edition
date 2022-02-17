// inherits the class Department from the other file
class ITDepartament extends Department {
  constructor(id: string, public admins: string[]) {
    super(id, "IT");
  }

  describe(this: Department): void {
    console.log("IT Departament - ID: " + " implementation from ITDepartament");
  }
}

const IT = new ITDepartament("2", ["Max", "Maria"]);
IT.describe();

class AccountingDepartament extends Department {
  private lastReport: string;

  get lastTaxReport() {
    if (this.tax_invoices.length === 0) {
      return this.lastReport;
    } else {
      throw new Error("No tax invoices");
    }
  }

  set lastTaxReport(value: string) {
    if (value.length > 3) {
      this.lastReport = value;
    } else {
      throw new Error("Tax report has to be longer than 3 characters");
    }
  }

  constructor(id: string, private tax_invoices: string[]) {
    super(id, "Accounting");
    this.lastReport = tax_invoices[0];
  }

  addEmployee(name: string) {
    if (name === "Max") {
      return;
    }
    this.employees.push(name);
  }

  addTax(tax: string) {
    this.tax_invoices.push(tax);
    this.lastReport = tax;
  }

  printTaxInvoices() {
    console.log(this.tax_invoices);
  }

  describe(this: Department): void {
    console.log(
      "IT Departament - ID: " + " implementation from AccountingDepartament"
    );
  }
}

const Accounting = new AccountingDepartament("3", [
  "CAS : 19832",
  "CASS : 98324",
]);

Accounting.lastTaxReport;
Accounting.lastTaxReport = "VAT : 4567";

//static properties and methods

Math.PI; // u call on the Math class itself
Math.round(Math.PI);

const employee1 = Department.createEmployee("Max"); // call the static method directly on the class
