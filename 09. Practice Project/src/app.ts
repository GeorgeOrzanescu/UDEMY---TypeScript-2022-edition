// OOP APPROACH

enum ProjectStatus {
  Active,
  Finished,
}

// Project type
class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public projectStatus: ProjectStatus
  ) {}
}

type Listener = (items: Project[]) => void;

// Project State management class

class ProjectState {
  private listeners: Listener[] = [];
  private projects: Project[] = [];
  private static instance: ProjectState;

  private constructor() {}

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  addListener(listenerFn: Listener) {
    this.listeners.push(listenerFn);
  }

  addProject(title: string, description: string, numOfPeople: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      numOfPeople,
      ProjectStatus.Active // default value
    );

    this.projects.push(newProject);
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice()); //uses slice() to make a copy of the array and not the original array
    }
  }
}

const projectState = ProjectState.getInstance(); // global state management object  singleton

// validation logic
interface Validatable {
  // interface for validation
  value: string | number;
  required?: boolean; // ? means optional   or u can do it like required: boolean | undefined
  minLength?: number;
  maxLength?: number; // this checks for min and max length of the string
  min?: number;
  max?: number; // this checks for min and max value of the number
}

function validate(ValidatableInput: Validatable) {
  let isValid = true; // this is the default value

  if (ValidatableInput.required) {
    isValid = isValid && ValidatableInput.value.toString().trim().length !== 0;
  }
  if (
    ValidatableInput.minLength &&
    typeof ValidatableInput.value === "string"
  ) {
    isValid =
      isValid &&
      ValidatableInput.value.trim().length >= ValidatableInput.minLength;
  }
  if (
    ValidatableInput.maxLength &&
    typeof ValidatableInput.value === "string"
  ) {
    isValid =
      isValid &&
      ValidatableInput.value.trim().length <= ValidatableInput.maxLength;
  }
  if (
    ValidatableInput.min != null &&
    typeof ValidatableInput.value === "number"
  ) {
    isValid = isValid && ValidatableInput.value >= ValidatableInput.min;
  }
  if (
    ValidatableInput.max != null &&
    typeof ValidatableInput.value === "number"
  ) {
    isValid = isValid && ValidatableInput.value <= ValidatableInput.max;
  }

  return isValid;
}

// autobind decorator
function Autobind(
  target: any,
  methodName: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
}

// projectList class
class ProjectList {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement; // the target where we want to add the project
  element: HTMLElement;
  assignedProjects: Project[] = [];

  constructor(private type: "active" | "finished") {
    this.templateElement = document.getElementById(
      "project-list"
    )! as HTMLTemplateElement;
    this.hostElement = document.querySelector("#app")! as HTMLDivElement;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as HTMLElement;
    this.element.id = `${this.type}-projects`;

    projectState.addListener((projects: Project[]) => {
      const relevantProjects = projects.filter((prj) => {
        // filter the projects based on the type
        if (this.type === "active") {
          return prj.projectStatus === ProjectStatus.Active;
        } else {
          return prj.projectStatus === ProjectStatus.Finished;
        }
      });

      this.assignedProjects = relevantProjects;
      this.renderProjects();
    });

    this.attach();
    this.renderContent();
  }

  private renderProjects() {
    const listEl = document.getElementById(
      `${this.type}-projects-list`
    )! as HTMLUListElement;

    listEl.innerHTML = "";

    for (const prjItem of this.assignedProjects) {
      const listItem = document.createElement("li");
      listItem.textContent = prjItem.title;
      listEl.appendChild(listItem);
    }
  }

  private renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector("h2")!.textContent =
      this.type.toUpperCase() + " PROJECTS";
  }

  private attach() {
    this.hostElement.insertAdjacentElement("beforeend", this.element);
  }
}

// class to render the project form
class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement; // the target where we want to add the project
  element: HTMLFormElement;

  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    this.templateElement = document.getElementById(
      "project-input"
    )! as HTMLTemplateElement;
    this.hostElement = document.querySelector("#app")! as HTMLDivElement;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = "user-input"; // just for better styling

    // get access to the input elements
    this.titleInputElement = this.element.querySelector(
      "#title"
    )! as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      "#description"
    )! as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      "#people"
    )! as HTMLInputElement;

    this.configure();
    this.attach();
  }

  // get the data from the form  and return a tuple with the data or void
  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true,
      minLength: 3,
    };
    const descriptionValidatable: Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
    };
    const peopleValidatable: Validatable = {
      value: +enteredPeople,
      required: true,
      min: 1,
      max: 10,
    };

    if (
      !validate(titleValidatable) ||
      !validate(descriptionValidatable) ||
      !validate(peopleValidatable)
    ) {
      alert("Please enter valid input!");
      return;
    } else {
      return [enteredTitle, enteredDescription, +enteredPeople];
    }
  }
  // clear the inputs after submiting the form
  private clearInputs() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.peopleInputElement.value = "";
  }

  // method to extract the data from the form
  @Autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput(); // to get the data from the form
    // check if the data is valid  tutple is an array
    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput; // destructuring
      projectState.addProject(title, desc, people); // add the project to the project state object
      console.log(title, desc, people);
    }
    this.clearInputs();
  }

  // add event listener to the form to get the data with the submit handler method
  private configure() {
    // this.element.addEventListener("submit", this.submitHandler.bind(this));
    this.element.addEventListener("submit", this.submitHandler);
  }

  // insert the form in the target div
  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
}

const projectInput = new ProjectInput();
const activeProjectList = new ProjectList("active");
const finishedProjectList = new ProjectList("finished");
