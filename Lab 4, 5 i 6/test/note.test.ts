/**
 * @jest-environment jsdom
 */

import Note from "../src/Note";

 
 describe('note class tests', () => {
  let note: Note;

  beforeAll(() => {
    note = new Note();
  });

   it('createUUID returns value which is not null', () => {
    const uuid: string = note.createUUID();

    expect(uuid).toBeTruthy();
   });
 });