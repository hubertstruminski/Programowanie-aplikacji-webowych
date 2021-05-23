import { INote } from './INote';
import Note from './Note';
import AppStorage from './AppStorage';

export class App {
  note: Note;
  appStorage: AppStorage;

  btnAdd: HTMLButtonElement;
  pinnedNotes: HTMLDivElement;
  otherNotes: HTMLDivElement;

  constructor() {
    this.appStorage = new AppStorage();
    this.note = new Note();

    this.getLayoutAccess();
    this.note.getInputsData();

    this.appStorage.data= [];
    this.addEventListenerToButton(this.appStorage.data);

    const data = this.appStorage.readDataFromLocalStorage() as INote[];
    this.appStorage.data = data;

    if(this.appStorage.data) {
      this.renderData(this.appStorage.data);
    }  
  }

  getLayoutAccess() {
    this.pinnedNotes = document.querySelector('#pinnedNotes');
    this.otherNotes = document.querySelector('#otherNotes');
    this.btnAdd = document.querySelector('#btnAdd');
  }
  
  addEventListenerToButton(data: INote[]) {
    this.btnAdd.addEventListener('click', async () => {
      this.note.createNote(data);
      this.appStorage.saveDataToLocalStorage(data);
      this.renderData(data);
    });
  }
  
  renderSpan(title: string, value: string) {
    const span = document.createElement('span');
    span.textContent = title + ": " + value;
    span.className = "noteSpan";

    return span;
  }

  renderNote(container: HTMLDivElement, item: INote) {
    const { title, content, color, createdAt } = item;

    const div = document.createElement('div');
    div.className = "note";
    div.style.backgroundColor = color;

    const titleSpan = this.renderSpan("Title", title);
    const contentSpan = this.renderSpan("Content", content);
    const createdAtSpan = this.renderSpan("Created At", createdAt.toString());

    div.appendChild(titleSpan);
    div.appendChild(contentSpan);
    div.appendChild(createdAtSpan);

    container.appendChild(div);
  }

  renderData(data: INote[]) {
    this.pinnedNotes.innerHTML = "";
    this.otherNotes.innerHTML = "";

    data.forEach((item: INote) => {
      const { isPinned } = item;

      if(isPinned) {
        this.renderNote(this.pinnedNotes, item);
      } else {
        this.renderNote(this.otherNotes, item);
      }
    });
  }
}

const app = new App();



//tsc app.ts --lib "es5, dom"