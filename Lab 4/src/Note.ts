import { INote } from './INote';

export default class Note {
  title: HTMLInputElement;
  content: HTMLInputElement;
  color: HTMLInputElement;

  getInputsData() {
    this.title = document.querySelector('#title');
    this.content = document.querySelector('#content');
    this.color = document.querySelector('#color');
  }

  createNote(data: INote[]) {
    const newNote = { 
      title: this.title.value,
      content: this.content.value,
      color: this.color.value,
      isPinned: false,
      createdAt: new Date() 
    };
    data.push(newNote as INote);
  }
}