import { INote } from './INote';

export default class AppStorage {
  data: INote[] = [];

  saveDataToLocalStorage(data: any) {
    window.localStorage.setItem('noteData', JSON.stringify(data));
  }

  readDataFromLocalStorage() {
    return JSON.parse(window.localStorage.getItem('noteData'));
  }
}