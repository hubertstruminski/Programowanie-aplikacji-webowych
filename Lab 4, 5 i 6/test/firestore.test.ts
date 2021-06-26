/**
 * @jest-environment jsdom
 */
import AppFirestoreStorage from '../src/AppFirestoreStorage ';
import { INote } from '../src/INote';
 
 describe('firebase tests', () => {
  let firestore: AppFirestoreStorage;
  const newNote: INote = { 
    color: '#fff', 
    content: 'Content', 
    createdAt: new Date(), 
    id: 'ABC123', 
    isPinned: false, 
    title: 'Title' 
  };

  beforeAll(() => {
    firestore = new AppFirestoreStorage();
   });

   it('addNote test', () => {
    firestore.addNote(newNote);

    firestore.getNote(newNote.id).then(response => {
      expect(response).toStrictEqual(newNote);
    });
   });

   it('deleteNote test', () => {
    firestore.addNote(newNote);
    firestore.deleteNote(newNote.id);

    firestore.getNotes().then(res => {
      expect(res.items).toStrictEqual([]);
    })
   });

   it('getNotes returns empty array when database empty', () => {
     firestore.getNotes().then(response => {
       expect(response.items).toStrictEqual([]);
     })
   })
 });