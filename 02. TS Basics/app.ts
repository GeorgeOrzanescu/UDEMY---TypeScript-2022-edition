let userInput: unknown;
let userName: string;

userInput = 5;
userInput = "Max";

if (typeof userInput === "string") {
  userName = userInput;
}

// function to generate error object
function generateError(message: string, code: number): never {
  throw { message: message, code: code };
}

generateError("An error occurred!", 500);
