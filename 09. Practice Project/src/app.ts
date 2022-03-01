// MY VERSION

class RenderInputForm {
  // HTML elements
  templateInput: HTMLTemplateElement;
  renderElement: HTMLDivElement;

  // input elements
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  // constructor
  constructor() {
    this.templateInput = document.getElementById(
      "project-input"
    )! as HTMLTemplateElement;
    this.renderElement = document.querySelector("#app")! as HTMLDivElement;

    // get access to the input elements
    this.titleInputElement = this.templateInput.content.querySelector(
      "#title"
    )! as HTMLInputElement;
    this.descriptionInputElement = this.templateInput.content.querySelector(
      "#description"
    )! as HTMLInputElement;
    this.peopleInputElement = this.templateInput.content.querySelector(
      "#people"
    )! as HTMLInputElement;

    this.attach();
  }

  // method to insert the form in the target div
  private attach() {
    this.renderElement.appendChild(this.templateInput.content);
  }
}

// instantiate the class
const inputForm = new RenderInputForm();
