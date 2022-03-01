// OOP APPROACH

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

    console.log(this.titleInputElement);

    this.configure();
    this.attach();
  }
  // method to extract the data from the form
  private submitHandler(event: Event) {
    event.preventDefault();
    const title = this.titleInputElement.value;
    const description = this.descriptionInputElement.value;
    const people = this.peopleInputElement.value;

    if (
      title.trim().length === 0 ||
      description.trim().length === 0 ||
      people.trim().length === 0
    ) {
      alert("Invalid input, please try again");
      return;
    }

    console.log(title, description, people);
  }
  // add event listener to the form to get the data with the submit handler method
  private configure() {
    this.element.addEventListener("submit", this.submitHandler.bind(this));
  }

  // insert the form in the target div
  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
}

const projectInput = new ProjectInput();
