class Calculator {
  constructor(previousDisplay, currentDisplay) {
    this.previousDisplay = previousDisplay;
    this.currentDisplay = currentDisplay;
    this.clear();
  }
  clear() {
    this.previousOperand = "";
    this.currentOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  handleError(message) {
    alert(`Error: ${message}`);
    this.clear();
    this.updateDisplay();
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) {
      this.handleError("Invalid input");
      return;
    }
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "/":
        if (current === 0) {
          this.handleError("Cannot divide by zero");
          return;
        }
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }

  updateDisplay() {
    this.currentDisplay.innerText = this.getDisplayNumber(this.currentOperand);
    if (this.operation != null) {
      this.previousDisplay.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this.previousDisplay.innerText = "";
    }
  }
}

// Reference
const previousDisplay = document.querySelector("[data-previous-operand]");
const currentDisplay = document.querySelector("[data-current-operand]");
const numberBtn = document.querySelectorAll("[data-number]");
const operatorBtn = document.querySelectorAll("[data-operator]");
const equalsBtn = document.querySelector("[data-equals]");
const deleteBtn = document.querySelector("[data-delete]");
const clearBtn = document.querySelector("[data-clear]");

const calculator = new Calculator(previousDisplay, currentDisplay);

numberBtn.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operatorBtn.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsBtn.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});

clearBtn.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteBtn.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

document.addEventListener("keydown", (event) => {
  handleKeyboardInput(event.key);
});

function handleKeyboardInput(key) {
  if (!isNaN(key) || key === ".") {
    calculator.appendNumber(key);
    calculator.updateDisplay();
  } else if (["+", "-", "*", "/"].includes(key)) {
    calculator.chooseOperation(key);
    calculator.updateDisplay();
  } else if (key === "Enter") {
    calculator.compute();
    calculator.updateDisplay();
  } else if (key === "Backspace") {
    calculator.delete();
    calculator.updateDisplay();
  } else if (key === "Escape") {
    calculator.clear();
    calculator.updateDisplay();
  }
}
