import AppStorage from './AppStorage';
import firebase from 'firebase';
import { firebaseConfig } from './config';
import { INote } from './INote';

export default class AppFirestoreStorage extends AppStorage {
  firebaseApp: firebase.app.App;
  database: firebase.firestore.Firestore;

  constructor() {
    super();
    this.init();
  }

  init() {
    if(!firebase.apps.length) {
      this.firebaseApp = firebase.initializeApp(firebaseConfig);
    } else {
      this.firebaseApp = firebase.app();
    }
    this.database = this.firebaseApp.firestore();
    
    // const note = { 
    //   title: 'Second note',
    //   content: 'Second note content from code',
    // } as INote;

    // this.addNote(note);
  }

  async addNote(note: INote) {
    await this.database.collection('notes').add(note);
  }

  async deleteNote(id: string) {
    await this.database.collection('notes').doc(id).delete();
  }

  async updateNote(id: string, note: INote) {
    await this.database.collection('notes').doc(id).update(note);
  }

  async getNote(id: string) {
    this.database
    .collection('notes')
    .doc(id)
    .get()
    .then(response => { return { data: response.data(), id: response.id }});
  }

  async getNotes() {
    this.database
    .collection('notes')
    .get()
    .then(response => { 
      return { 
        size: response.size, 
        docs: response.docs.map(item => item.data())
      }
    });
  }
}