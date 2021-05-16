interface Weather {
  clouds: {
    all: number;
  };
  main: {
    temp: number;
    humidity: number;
    pressure: number;
  };
  name: string;
  weather: WeatherDescription[];
}

interface WeatherDescription {
  main: string;
}

export class App {
  apiKey: string = '02d73d90957bd15023615b881aae162a';
  cityInput: HTMLInputElement;
  btnSearch: HTMLButtonElement;
  data: Weather[];
  container: HTMLDivElement;

  constructor() {
    this.getInputsData();
    this.data = [];
    this.addEventListenerToButton();
    const data = this.readDataFromLocalStorage();
    this.data = data;
    this.renderData(data);
  }

  getInputsData() {
    this.cityInput = document.querySelector('#cityInput');
    this.btnSearch = document.querySelector('#btnSearch');
    this.container = document.querySelector('#container');
  }

  addEventListenerToButton() {
    this.btnSearch.addEventListener('click', async () => {
      const weatherData = await this.getWeatherData(this.cityInput.value);
      this.data.push(weatherData as Weather);
      this.renderData(this.data);
      this.saveDataToLocalStorage(this.data);
    });
  }

  async getWeatherData(city: string): Promise<any> {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}`;
    return await (await fetch(url)).json();
  }

  saveDataToLocalStorage(data: any) {
    localStorage.setItem('weatherData', JSON.stringify(data));
  }

  readDataFromLocalStorage() {
    return JSON.parse(localStorage.getItem('weatherData'));
  }

  renderData(data: Weather[]) {
    this.container.innerHTML = "";

    data.forEach((item: Weather) => {
      const { 
        clouds, 
        main: { 
          temp, 
          humidity, 
          pressure 
        }, 
        name, 
        weather
      } = item;


      const nameSpan = document.createElement('span');
      nameSpan.textContent = name;
      nameSpan.className = "span";

      const div = document.createElement('div');
      div.className = "singleDiv"

      const descriptionSpan = document.createElement('span');
      descriptionSpan.textContent = "Description: " + weather[0].main;
      descriptionSpan.className = "span";

      const pressureSpan = document.createElement('span');
      pressureSpan.textContent = "Pressure: " + pressure.toString() + " hPa";
      pressureSpan.className = "span";

      const humiditySpan = document.createElement('span');
      humiditySpan.textContent = "Humidity: " + humidity + " %";
      humiditySpan.className = "span";

      const temperatureSpan = document.createElement('span');
      temperatureSpan.innerHTML = "Temperature: " + this.convertKelvinToCelsjus(temp) + " <sup>o</sup>C";
      temperatureSpan.className = "span";

      const cloudinessSpan = document.createElement('span');
      cloudinessSpan.textContent = "Cloudiness: " + clouds + " %";
      cloudinessSpan.className = "span";

      div.appendChild(nameSpan);
      div.appendChild(descriptionSpan);
      div.appendChild(pressureSpan);
      div.appendChild(humiditySpan);
      div.appendChild(temperatureSpan);

      this.container.appendChild(div);
    });
    
  }

  convertKelvinToCelsjus(kelvinValue: number) {
    return (kelvinValue - 273.15).toFixed(2);
  }
  
}

const app = new App();

//tsc app.ts --lib "es5, dom"