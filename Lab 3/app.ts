export class App {
  apiKey: string = '02d73d90957bd15023615b881aae162a';
  cityInput: HTMLInputElement;
  btnSearch: HTMLButtonElement;
  cities: string[] = ['Wrocław', 'Lublin', 'Częstochowa', 'Gdańska', 'Szczecin', 'Warszawa', 'Białystok'];
  data: any[];

  constructor() {
    this.getInputsData();
    this.addEventListenerToButton();
  }

  getInputsData() {
    this.cityInput = document.querySelector('#cityInput');
    this.btnSearch = document.querySelector('#btnSearch');
  }

  addEventListenerToButton() {
    this.btnSearch.addEventListener('click', async () => {
      const weatherData = await this.getWeatherData(this.cityInput.value);
      this.saveDataToLocalStorage(weatherData);

      this.cities.forEach(async (cityName) => this.data.push(await this.getWeatherData(cityName)));
    });
  }

  async getWeatherData(city: string): Promise<any> {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}`;
    return await (await fetch(url)).json();
  }

  saveDataToLocalStorage(data: any) {
    localStorage.setItem('weatherData', JSON.stringify(data));
  }
  
}

const app = new App();

//tsc app.ts --lib "es5, dom"