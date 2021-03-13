interface RemoveInputInterface {
    span: HTMLElement;
    input: HTMLInputElement;
    index: number;
}

class Statistics {
    inputs: HTMLInputElement[]; 
    numberInput: HTMLInputElement;
    inputsContainer: HTMLElement; 
    statisticInputs: HTMLCollectionOf<Element>;
    statisticContainer: HTMLElement;
    loadingContainer: HTMLElement;
    inputsToRemove: RemoveInputInterface[] = [];
    removeButton: HTMLElement;


    constructor() {
        this.init();
    }

    init() {
        this.getAccess();
        this.getStatisticInputs();
        this.loadingContainer.style.display = "none";
        this.addListenerToNumberInput();
        this.addEventListenerToRemoveButton();
    }

    getAccess() {
        this.numberInput = document.querySelector("#numberInput");
        this.inputsContainer = document.getElementById("inputs-container");
        this.statisticContainer = document.getElementById("statistics-container");
        this.loadingContainer = document.getElementById("loading-container");
        this.removeButton = document.getElementById("remove-button");
    }

    getStatisticInputs() {
        this.statisticInputs = document.getElementsByClassName("statistic-elements");
    }

    addListenerToNumberInput() {
        this.numberInput.addEventListener('input', () => {
            this.generateInputs();
            this.addEventListenerToInputs();
        });
    }

    generateInputs() {
        this.inputs = [];
        this.inputsContainer.innerHTML = "";
        for(let i = 0; i < Number(this.numberInput.value); i++) {
            const span: HTMLElement = document.createElement("span");

            const checkbox: HTMLInputElement = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.value = i.toString();


            const newInput: HTMLInputElement = document.createElement("input");
            newInput.type = "text";

            span.appendChild(checkbox);
            span.appendChild(newInput);

            this.addEventListenerToCheckbox(checkbox, span, newInput, i);

            this.inputs.push(newInput);
            this.inputsContainer.appendChild(span);
        }
    }

    addEventListenerToCheckbox(checkbox: HTMLInputElement, span: HTMLElement, input: HTMLInputElement, index: number) {
        checkbox.addEventListener('change', () => {
            if(checkbox.checked) {
                this.inputsToRemove.push({ span: span, input: input, index: index })
            } else {
                this.inputsToRemove.splice(index, 1);
            }
        });
    }

    addEventListenerToRemoveButton() {
        this.removeButton.addEventListener('click', () => {
            this.inputsToRemove.forEach(inputToRemove => {
                const span: HTMLElement = inputToRemove.span;
                inputToRemove.input.removeEventListener('input', this.performLayoutAndStatisticsActions.bind(this, inputToRemove.index));
                span.innerHTML = "";

                const indexToRemove = this.inputs.indexOf(inputToRemove.input);
                if(indexToRemove > -1) {
                    this.inputs.splice(indexToRemove, 1);
                }
                this.recomputeStatistics();
            })
        });
    }

    addEventListenerToInputs() {
        for(let i=0; i<this.inputs.length; i++) {
            this.inputs[i].addEventListener('input', this.performLayoutAndStatisticsActions.bind(this, i), false);
        }
    }

    performLayoutAndStatisticsActions(i: number) {
        console.log(i);
        if(/^[+-]?\d+(\.\d+)?$/g.test(this.inputs[i].value) && this.inputs[i].value !== "") {
            this.loadingContainer.style.display = "none";
            this.statisticContainer.style.display = "inline";

            const statistics = this.computeStatistics();
            this.assignStatisticsToInputs(statistics);
        } else {
            this.statisticContainer.style.display = "none";
            this.loadingContainer.style.display = "inline";
        }
    }

    assignStatisticsToInputs(statistics: Number[]) {
        for(let i = 0; i < statistics.length; i++) {
            const input: HTMLInputElement = <HTMLInputElement>this.statisticInputs[i];
            input.value = statistics[i].toString();
        }
    }

    recomputeStatistics() {
        const statistics = this.computeStatistics();
        this.assignStatisticsToInputs(statistics);
    }

    computeStatistics() {
        const array: number[] = [];
        let sum: number = 0;
        for(let i=0; i<this.inputs.length; i++) {
            const input: HTMLInputElement = <HTMLInputElement>this.inputs[i];
            if(input.value !== "") {
                sum += Number(input.value);
                array.push(Number(input.value));
            }  
        }
        const avg = sum / array.length;
        const min = Math.min(...array);
        const max = Math.max(...array);
        return [sum, avg, min, max];
    }
}

const stats = new Statistics();