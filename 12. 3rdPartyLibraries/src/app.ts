// import _ from "lodash";
// declare var GLOBAL: string;

// console.log(_.shuffle([1, 2, 3, 4, 5, 6]));

// console.log(GLOBAL);

import { validate } from "class-validator";

import "reflect-metadata";
import { plainToInstance } from "class-transformer";

import { Product } from "./models/product.model";

// const p1 = new Product("book", 12.99);
// console.log(p1.getInformation());

// let's say this is info u get from a db
const products = [
  { title: "carpet", price: 12 },
  { title: "water", price: 10.99 },
];

// you would have to do something similar to create the objects from that data
const loadedProducts = products.map((prod) => {
  return new Product(prod.title, prod.price);
});

for (const prod of loadedProducts) {
  console.log(prod.getInformation());
}

// CLASS TRANSFORMER

const loadedProducts1 = plainToInstance(Product, products);
for (const prod of loadedProducts1) {
  console.log(prod.getInformation());
}

// CLASS VALIDATOR

const newProd = new Product("", -5.99);
validate(newProd).then((errors) => {
  if (errors.length > 0) {
    console.log("Validation errors");
    console.log(errors);
  } else {
    console.log(newProd.getInformation());
  }
});
