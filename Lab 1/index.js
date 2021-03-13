var Statistics = /** @class */ (function () {
    function Statistics() {
        this.inputsToRemove = [];
        this.init();
    }
    Statistics.prototype.init = function () {
        this.getAccess();
        this.getStatisticInputs();
        this.loadingContainer.style.display = "none";
        this.addListenerToNumberInput();
        this.addEventListenerToRemoveButton();
    };
    Statistics.prototype.getAccess = function () {
        this.numberInput = document.querySelector("#numberInput");
        this.inputsContainer = document.getElementById("inputs-container");
        this.statisticContainer = document.getElementById("statistics-container");
        this.loadingContainer = document.getElementById("loading-container");
        this.removeButton = document.getElementById("remove-button");
    };
    Statistics.prototype.getStatisticInputs = function () {
        this.statisticInputs = document.getElementsByClassName("statistic-elements");
    };
    Statistics.prototype.addListenerToNumberInput = function () {
        var _this = this;
        this.numberInput.addEventListener('input', function () {
            _this.generateInputs();
            _this.addEventListenerToInputs();
        });
    };
    Statistics.prototype.generateInputs = function () {
        this.inputs = [];
        this.inputsContainer.innerHTML = "";
        for (var i = 0; i < Number(this.numberInput.value); i++) {
            var span = document.createElement("span");
            var checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.value = i.toString();
            var newInput = document.createElement("input");
            newInput.type = "text";
            span.appendChild(checkbox);
            span.appendChild(newInput);
            this.addEventListenerToCheckbox(checkbox, span, newInput, i);
            this.inputs.push(newInput);
            this.inputsContainer.appendChild(span);
        }
    };
    Statistics.prototype.addEventListenerToCheckbox = function (checkbox, span, input, index) {
        var _this = this;
        checkbox.addEventListener('change', function () {
            if (checkbox.checked) {
                _this.inputsToRemove.push({ span: span, input: input, index: index });
            }
            else {
                _this.inputsToRemove.splice(index, 1);
            }
        });
    };
    Statistics.prototype.addEventListenerToRemoveButton = function () {
        var _this = this;
        this.removeButton.addEventListener('click', function () {
            _this.inputsToRemove.forEach(function (inputToRemove) {
                var span = inputToRemove.span;
                inputToRemove.input.removeEventListener('input', _this.performLayoutAndStatisticsActions.bind(_this, inputToRemove.index));
                span.innerHTML = "";
                var indexToRemove = _this.inputs.indexOf(inputToRemove.input);
                if (indexToRemove > -1) {
                    _this.inputs.splice(indexToRemove, 1);
                }
                _this.recomputeStatistics();
            });
        });
    };
    Statistics.prototype.addEventListenerToInputs = function () {
        for (var i = 0; i < this.inputs.length; i++) {
            this.inputs[i].addEventListener('input', this.performLayoutAndStatisticsActions.bind(this, i), false);
        }
    };
    Statistics.prototype.performLayoutAndStatisticsActions = function (i) {
        console.log(i);
        if (/^[+-]?\d+(\.\d+)?$/g.test(this.inputs[i].value) && this.inputs[i].value !== "") {
            this.loadingContainer.style.display = "none";
            this.statisticContainer.style.display = "inline";
            var statistics = this.computeStatistics();
            this.assignStatisticsToInputs(statistics);
        }
        else {
            this.statisticContainer.style.display = "none";
            this.loadingContainer.style.display = "inline";
        }
    };
    Statistics.prototype.assignStatisticsToInputs = function (statistics) {
        for (var i = 0; i < statistics.length; i++) {
            var input = this.statisticInputs[i];
            input.value = statistics[i].toString();
        }
    };
    Statistics.prototype.recomputeStatistics = function () {
        var statistics = this.computeStatistics();
        this.assignStatisticsToInputs(statistics);
    };
    Statistics.prototype.computeStatistics = function () {
        var array = [];
        var sum = 0;
        for (var i = 0; i < this.inputs.length; i++) {
            var input = this.inputs[i];
            if (input.value !== "") {
                sum += Number(input.value);
                array.push(Number(input.value));
            }
        }
        var avg = sum / array.length;
        var min = Math.min.apply(Math, array);
        var max = Math.max.apply(Math, array);
        return [sum, avg, min, max];
    };
    return Statistics;
}());
var stats = new Statistics();
