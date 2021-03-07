class Statistics {
    inputs: HTMLCollectionOf<Element>;

    constructor() {
        this.init();
    }

    init() {
        this.getAccess();
        this.addEventListenerToInputs();
    }

    getAccess() {
        this.inputs = document.getElementsByClassName("input-elements");
    }

    addEventListenerToInputs() {
        for(let i=0; i<this.inputs.length; i++) {
            this.inputs[i].addEventListener('input', (event) => this.computeStatistics(event, i));
        }
    }

    computeStatistics(event: Event, index: Number) {
        const array: number[] = [];
        let sum: number = 0;
        for(let i=0; i<this.inputs.length; i++) {
            const input: HTMLInputElement = <HTMLInputElement>this.inputs[i];
            sum += Number(input.value);
            array.push(Number(input.value));
        }
        const avg = sum / this.inputs.length;
        const min = Math.min(...array);
        const max = Math.max(...array);
        return [sum, avg, min, max];
    }
}

const stats = new Statistics();