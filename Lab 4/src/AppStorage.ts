import { INote } from './INote';

export default class AppStorage {
  data: INote[] = [];

  saveDataToLocalStorage(data: any) {
    localStorage.setItem('noteData', JSON.stringify(data));
  }

  readDataFromLocalStorage() {
    return JSON.parse(localStorage.getItem('noteData'));
  }
}