class Calculator {
  constructor(previousDisplay, currentDisplay) {
    this.previousDisplay = previousDisplay;
    this.currentDisplay = currentDisplay;
  }
  clear() {}

  delete() {}

  appendNumber() {}

  compute() {}

  chooseOperation() {}

  updateDisplay() {}
}

// Reference
const previousDisplay = document.querySelector("[data-previous-operand]");
const currentDisplay = document.querySelector("[data-current-operand]");
const numberBtn = document.querySelectorAll("[data-number]");
const operatorBtn = document.querySelectorAll("[data-operator]");
const equalsBtn = document.querySelector("[data-equals]");
const deleteBtn = document.querySelector("[data-delete]");
const clearBtn = document.querySelector("[data-clear]");
