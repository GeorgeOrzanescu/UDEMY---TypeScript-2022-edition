// generic classes

class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    // this will not work on objects because u get as a parameter the object address
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
const numberStorage = new DataStorage<number>();

textStorage.addItem("George");
textStorage.addItem("Cristina");

console.log(textStorage.getItems());

// const objStorage = new DataStorage<object>();
// objStorage.addItem({ name: "John" });
// objStorage.addItem({ name: "Cristina" });

// objStorage.removeItem({ name: "John" });

// console.log(objStorage.getItems());

// built-in generics   utility types

interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourseGoal(
  title: string,
  description: string,
  date: Date
): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {};
  // Partial is a utility type that makes the properties optional

  courseGoal["title"] = title;
  courseGoal["description"] = description;
  courseGoal["completeUntil"] = date;

  return courseGoal as CourseGoal; //type casting
}

const namesFriends: Readonly<string[]> = ["John", "Cristina"];
// this will make the array readonly can not be modified

// namesFriends.push("George"); // will not work


