import { INote } from './INote';
import Note from './Note';
import AppStorage from './AppStorage';
import { 
  BLACK,
  EDIT_BUTTON_BACKGROUND, 
  EDIT_BUTTON_TEXT, 
  REMOVE_BUTTON_BACKGROUND, 
  WHITE 
} from './Colors';
import { IButton } from './IButton';
import AppFirestoreStorage from './AppFirestoreStorage ';

export class App {
  note: Note;
  appStorage: AppStorage;
  appFirestoreStorage: AppFirestoreStorage;

  btnAdd: HTMLButtonElement;
  pinnedNotes: HTMLDivElement;
  otherNotes: HTMLDivElement;

  constructor() {
    this.appStorage = new AppStorage();
    this.appFirestoreStorage = new AppFirestoreStorage();
    this.note = new Note();

    this.appFirestoreStorage.init();

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
      this.note.clearInputs();
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

  renderButton(container: HTMLDivElement, item: IButton, callback: Function) {
    const { backgroundColor, color, text } = item;
    const button = document.createElement('button');

    button.style.border = "1.5px solid " + WHITE;
    button.style.margin = "5px";
    button.style.backgroundColor = backgroundColor;
    button.style.color = color;
    button.innerHTML = text;

    button.addEventListener('click', () => callback());
    container.appendChild(button);
  }

  renderNote(container: HTMLDivElement, item: INote) {
    const { title, content, color, createdAt, id, isPinned } = item;

    const div = document.createElement('div');
    div.className = "note";
    div.style.backgroundColor = color;

    const titleSpan = this.renderSpan("Title", title);
    const contentSpan = this.renderSpan("Content", content);
    const createdAtSpan = this.renderSpan("Created At", createdAt.toString());

    div.appendChild(titleSpan);
    div.appendChild(contentSpan);
    div.appendChild(createdAtSpan);

    const buttonContainer = document.createElement('div') as HTMLDivElement;
    buttonContainer.className = "buttonContainer"

    const editButton = { 
      text: 'Edit', 
      backgroundColor: EDIT_BUTTON_BACKGROUND, 
      color: EDIT_BUTTON_TEXT 
    } as IButton;
    this.renderButton(buttonContainer, editButton, () => this.editNote(id));

    const deleteButton = { 
      text: 'Delete', 
      backgroundColor: REMOVE_BUTTON_BACKGROUND, 
      color: WHITE 
    } as IButton;
    this.renderButton(buttonContainer, deleteButton, () => this.deleteNote(id));

    const pushPinButton = { 
      text: isPinned ? 'Push off pin' : 'Push pin', 
      backgroundColor: WHITE, 
      color: BLACK
    } as IButton;
    this.renderButton(buttonContainer, pushPinButton, (button: HTMLButtonElement) => this.pushPinNote(id));

    div.appendChild(buttonContainer);
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

  pushPinNote(id: string) {
    const data = this.appStorage.readDataFromLocalStorage() as INote[];

    const foundItem = data.filter((item: INote) => item.id === id);
    const index = data.findIndex((item: INote) => item.id === id);
    
    if(foundItem) {
      let { id, content, title, color, createdAt, isPinned } = foundItem[0] as INote;

      const newObject = {
        isPinned: isPinned ? false : true,
        id,
        content,
        title,
        color,
        createdAt
      };

      data[index] = newObject;
      this.appStorage.data = data;
      
      this.appStorage.saveDataToLocalStorage(data);
      this.renderData(data);
    }
  }

  deleteNote(id: string) {
    const data = this.appStorage.readDataFromLocalStorage() as INote[];

    const newData = data.filter((item: INote) => item.id !== id);
    this.appStorage.data = newData;

    this.appStorage.saveDataToLocalStorage(newData);
    this.renderData(newData);
  }

  editNote(id: string) {
    const data = this.appStorage.readDataFromLocalStorage() as INote[];

    const foundItem = data.filter((item: INote) => item.id === id);
    const newData = data.filter((item: INote) => item.id !== id);

    if(foundItem) {
      let { content, title, color } = foundItem[0] as INote;

      this.note.title.value = title;
      this.note.content.value = content;
      this.note.color.value = color;

      this.appStorage.data = newData;
      this.appStorage.saveDataToLocalStorage(newData);
      this.renderData(newData);
    }
  }
}

const app = new App();



//tsc app.ts --lib "es5, dom"