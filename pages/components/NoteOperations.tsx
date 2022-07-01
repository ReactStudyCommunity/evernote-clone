import { useState, useEffect } from "react";
import styles from "../../styles/Evernote.module.scss";
import { app, database } from "../../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

// RichTextView
import "react-quill/dist/quill.snow.css";

export default function NoteOperations() {
  const [isInputVisible, setInputVisible] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteDesc, setNoteDesc] = useState("");
  const dbInstance = collection(database, "note");
  const [isUseQuill, setIsUseQuill] = useState(false);
  const ReactQuill =
    typeof window === "object" ? require("react-quill") : () => false;

  const inputToggle = () => {
    setInputVisible(!isInputVisible);
  };

  const addDesc = (value) => {
    setNoteDesc(value);
  };

  const saveNote = () => {
    addDoc(dbInstance, {
      noteTitle: noteTitle,
      noteDesc: noteDesc,
    }).then(() => {
      setNoteTitle("");
      setNoteDesc("");
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
              placeholder="タイトルを入力してください"
              onChange={(e) => setNoteTitle(e.target.value)}
              value={noteTitle}
            />
            <div className={styles.ReactQuill}>
              <ReactQuill onChange={addDesc} value={noteDesc} />
            </div>
            <button className={styles.saveBtn} onClick={saveNote}>
              Save Note
            </button>
          </div>
        )}
      </div>
    </>
  );
}
