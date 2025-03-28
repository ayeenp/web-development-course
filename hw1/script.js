class FormulaEvaluator {
    constructor(formulaElement) {
      this.formulaElement = formulaElement;
      this.evaluator = formulaElement.getAttribute("evaluator");
      this.variables = this.extractVariables(this.evaluator);
      this.attachListeners();
      this.update();
    }
  
    extractVariables(evaluator) {
      const regex = /[a-zA-Z_]\w*/g;
      const matches = evaluator.match(regex) || [];
      return Array.from(new Set(matches));
    }
  
    attachListeners() {
      this.variables.forEach(variable => {
        const inputElement = document.getElementById(variable);
        if (inputElement) {
          inputElement.addEventListener("input", () => this.update());
        }
      });
    }
  
    update() {
      try {
        const values = this.variables.map(variable => {
          const elem = document.getElementById(variable);
          const val = parseFloat(elem ? elem.value : NaN);
          return isNaN(val) ? 0 : val;
        });
        
        const func = new Function(...this.variables, "return " + this.evaluator);
        const result = func(...values);
        
        // If result is not a valid number, display error.
        if (typeof result !== "number" || isNaN(result)) {
          this.formulaElement.textContent = "Invalid Formula.";
        } else {
          this.formulaElement.textContent = result;
        }
      } catch (error) {
        // In case of any error during evaluation, display error message.
        this.formulaElement.textContent = "Invalid Formula.";
      }
    }
  }
  
  // When the DOM is fully loaded, initialize FormulaEvaluator for each <formula> element.
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("formula").forEach(formulaElement => {
      new FormulaEvaluator(formulaElement);
    });
  });
  