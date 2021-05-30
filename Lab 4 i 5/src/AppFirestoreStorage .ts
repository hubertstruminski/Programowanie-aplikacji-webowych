import AppStorage from './AppStorage';
import firebase from 'firebase';
import { firebaseConfig } from './config';
import { INote } from './INote';
import { IFirebaseGet } from './IFirebaseGet';

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
  }

  async addNote(note: INote) {
    await this.database.collection('notes').doc(note.id).set(note);
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

  async getNotes(): Promise<IFirebaseGet> {
    return this.database
    .collection('notes')
    .get()
    .then(response => { 
      return { 
        size: response.size, 
        items: response.docs.map(item => item.data())
      } as IFirebaseGet;
    });
  }
}