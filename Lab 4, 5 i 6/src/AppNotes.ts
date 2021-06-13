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
import { StorageType, StorageTypeApp } from './config';
import { IFirebaseGet, ITimestamp, isITimestamp } from './IFirebaseGet';

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

    
    this.getContent().then(data => {
      this.appStorage.data = data;

      if(this.appStorage.data) {
        this.renderData(this.appStorage.data);
      } 
    });
  }

  async getContent() {
    let data = null;
    //@ts-ignore
    if(StorageTypeApp === StorageType.FILESTORE) {
      const { items } = await this.appFirestoreStorage.getNotes();
      data = items.map((item: INote) => {
        let date = null;
        if(isITimestamp(item.createdAt)) {
          date = item.createdAt as ITimestamp;
          date = new Date(date.seconds * 1000);
        } else {
          date = new Date();
        }
        return  {...item, createdAt: date } as INote;
      });
      console.log(data);
    } else {
      data = this.appStorage.readDataFromLocalStorage() as INote[];
    }
    return data;
  }

  getLayoutAccess() {
    this.pinnedNotes = document.querySelector('#pinnedNotes');
    this.otherNotes = document.querySelector('#otherNotes');
    this.btnAdd = document.querySelector('#btnAdd');
  }
  
  addEventListenerToButton(data: INote[]) {
    this.btnAdd.addEventListener('click', async () => {
      this.note.getInputsData();
      this.note.createNote(this.appStorage.data, this.appFirestoreStorage);
      this.note.clearInputs();

      //@ts-ignore
      if(StorageTypeApp !== StorageType.FILESTORE) {
        this.appStorage.saveDataToLocalStorage(this.appStorage.data);
      }
      this.renderData(this.appStorage.data);
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

  async pushPinNote(id: string) {
    const data = await this.getContent();

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
      
      //@ts-ignore
      if(StorageTypeApp !== StorageType.FILESTORE) {
        this.appStorage.saveDataToLocalStorage(data);
      } else {
        this.appFirestoreStorage.updateNote(newObject.id, newObject);
      }
      this.renderData(data);
    }
  }

  async deleteNote(id: string) {
    let newData = null;

    //@ts-ignore
    if(StorageTypeApp === StorageType.FILESTORE) {
      const items = await this.getContent();
      newData = items.filter((item: INote) => item.id !== id);

      this.appFirestoreStorage.deleteNote(id);
    } else {
      const data = this.appStorage.readDataFromLocalStorage() as INote[];
      newData = data.filter((item: INote) => item.id !== id);

      this.appStorage.saveDataToLocalStorage(newData);
    }
    this.appStorage.data = newData;
    this.renderData(newData);
  }

  async editNote(id: string) {
    const data = await this.getContent();

    const foundItem = data.filter((item: INote) => item.id === id);
    const newData = data.filter((item: INote) => item.id !== id);

    if(foundItem) {
      let { content, title, color, id } = foundItem[0] as INote;

      this.note.title.value = title;
      this.note.content.value = content;
      this.note.color.value = color;
      this.note.id.value = id;

      this.appStorage.data = newData;

      //@ts-ignore
      if(StorageTypeApp !== StorageType.FILESTORE) {
        this.appStorage.saveDataToLocalStorage(newData);
      }
      this.renderData(newData);
    }
  }
}

const app = new App();



//tsc app.ts --lib "es5, dom"