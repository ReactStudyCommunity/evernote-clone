import { useState, useEffect } from "react";
import styles from "../../styles/Evernote.module.scss";
import { app, database } from "../../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export default function NoteOperations() {
  const [isInputVisible, setInputVisible] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDesc, setNoteDesc] = useState("");
  const dbInstance = collection(database, "note");

  const inputToggle = () => {
    setInputVisible(!isInputVisible);
  };

  const saveNote = () => {
    addDoc(dbInstance, {
      noteTitle: noteTitle,
      noteDesc: noteDesc,
    });
  };

  return (
    <>
      <div className={styles.btnContainer}>
        <button onClick={inputToggle} className={styles.button}>
          Add a New Note
        </button>

        {isInputVisible && (
          <div className={styles.inputContainer}>
            <input
              className={styles.input}
              placeholder="Enter the Title..."
              onChange={(e) => setNoteTitle(e.target.value)}
            />
            <button className={styles.saveBtn} onClick={saveNote}>
              Save Note
            </button>
          </div>
        )}
      </div>
    </>
  );
}
