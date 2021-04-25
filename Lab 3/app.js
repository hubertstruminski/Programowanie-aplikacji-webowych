"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.App = void 0;
var App = /** @class */ (function () {
    function App() {
        this.apiKey = '02d73d90957bd15023615b881aae162a';
        this.getInputsData();
        this.data = [];
        this.addEventListenerToButton();
        var data = this.readDataFromLocalStorage();
        this.data = data;
        this.renderData(data);
    }
    App.prototype.getInputsData = function () {
        this.cityInput = document.querySelector('#cityInput');
        this.btnSearch = document.querySelector('#btnSearch');
        this.container = document.querySelector('#container');
    };
    App.prototype.addEventListenerToButton = function () {
        var _this = this;
        this.btnSearch.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
            var weatherData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getWeatherData(this.cityInput.value)];
                    case 1:
                        weatherData = _a.sent();
                        this.data.push(weatherData);
                        this.renderData(this.data);
                        this.saveDataToLocalStorage(this.data);
                        return [2 /*return*/];
                }
            });
        }); });
    };
    App.prototype.getWeatherData = function (city) {
        return __awaiter(this, void 0, void 0, function () {
            var url;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        url = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + this.apiKey;
                        return [4 /*yield*/, fetch(url)];
                    case 1: return [4 /*yield*/, (_a.sent()).json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    App.prototype.saveDataToLocalStorage = function (data) {
        localStorage.setItem('weatherData', JSON.stringify(data));
    };
    App.prototype.readDataFromLocalStorage = function () {
        return JSON.parse(localStorage.getItem('weatherData'));
    };
    App.prototype.renderData = function (data) {
        var _this = this;
        this.container.innerHTML = "";
        data.forEach(function (item) {
            var clouds = item.clouds, _a = item.main, temp = _a.temp, humidity = _a.humidity, pressure = _a.pressure, name = item.name, weather = item.weather;
            var nameSpan = document.createElement('span');
            nameSpan.textContent = name;
            nameSpan.className = "span";
            var div = document.createElement('div');
            div.className = "singleDiv";
            var descriptionSpan = document.createElement('span');
            descriptionSpan.textContent = "Description: " + weather[0].main;
            descriptionSpan.className = "span";
            var pressureSpan = document.createElement('span');
            pressureSpan.textContent = "Pressure: " + pressure.toString() + " hPa";
            pressureSpan.className = "span";
            var humiditySpan = document.createElement('span');
            humiditySpan.textContent = "Humidity: " + humidity + " %";
            humiditySpan.className = "span";
            var temperatureSpan = document.createElement('span');
            temperatureSpan.innerHTML = "Temperature: " + _this.convertKelvinToCelsjus(temp) + " <sup>o</sup>C";
            temperatureSpan.className = "span";
            var cloudinessSpan = document.createElement('span');
            cloudinessSpan.textContent = "Cloudiness: " + clouds + " %";
            cloudinessSpan.className = "span";
            div.appendChild(nameSpan);
            div.appendChild(descriptionSpan);
            div.appendChild(pressureSpan);
            div.appendChild(humiditySpan);
            div.appendChild(temperatureSpan);
            _this.container.appendChild(div);
        });
    };
    App.prototype.convertKelvinToCelsjus = function (kelvinValue) {
        return (kelvinValue - 273.15).toFixed(2);
    };
    return App;
}());
exports.App = App;
var app = new App();
//tsc app.ts --lib "es5, dom"
