import { INote } from './INote';
import { StorageTypeApp, StorageType } from './config';
import AppFirestoreStorage from './AppFirestoreStorage ';

export default class Note {
  title: HTMLInputElement;
  content: HTMLInputElement;
  color: HTMLInputElement;
  id: HTMLInputElement;

  getInputsData() {
    this.title = document.querySelector('#title');
    this.content = document.querySelector('#content');
    this.color = document.querySelector('#color');
    this.id = document.querySelector('#id');
  }

  createNote(data: INote[], fileStore: AppFirestoreStorage) {
    const newNote = {
      id: this.id.value ? this.id.value : Date.now().toString(36) + Math.random().toString(36).substring(2), 
      title: this.title.value,
      content: this.content.value,
      color: this.color.value,
      isPinned: false,
      createdAt: new Date() 
    };

    //@ts-ignore
    if(StorageTypeApp === StorageType.FILESTORE) {
      if(this.id.value) {
        fileStore.updateNote(newNote.id, newNote);
      } else {
        fileStore.addNote(newNote);
      }
      data.push(newNote as INote);
    } else {
      data.push(newNote as INote);
    }
  }

  clearInputs() {
    this.title.value = "";
    this.content.value = "";
    this.color.value = "#000000";
    this.id.value = null;
  }
}