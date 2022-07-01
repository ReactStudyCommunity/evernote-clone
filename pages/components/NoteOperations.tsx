import { useState, useEffect } from "react";
import styles from "../../styles/Evernote.module.scss";
import { Note, noteConverter } from "../../models/Note";
import { app, database } from "../../firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";

// RichTextView
import "react-quill/dist/quill.snow.css";

export default function NoteOperations() {
  const [isInputVisible, setInputVisible] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const dbInstance = collection(database, "note");
  const ReactQuill =
    typeof window === "object" ? require("react-quill") : () => false;
  const [notesArray, setNotesArray] = useState<Note[]>([]);

  const inputToggle = () => {
    setInputVisible(!isInputVisible);
  };

  const getNotes = async () => {
    const docRef = dbInstance.withConverter(noteConverter);
    await getDocs(docRef).then((data) => {
      setNotesArray(
        data.docs.map((item) => {
          return { ...item.data() };
        })
      );
    });
  };

  const saveNote = async () => {
    const docRef = dbInstance.withConverter(noteConverter);
    const note: Note = {
      id: new Date().getTime(),
      title: title,
      desc: desc,
    };
    await addDoc(docRef, note).then(() => {
      setTitle("");
      setDesc("");
      getNotes();
    });
  };

  useEffect(() => {
    getNotes();
  }, []);

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
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <div className={styles.ReactQuill}>
              <ReactQuill onChange={setDesc} value={desc} />
            </div>
            <button className={styles.saveBtn} onClick={saveNote}>
              Save Note
            </button>
          </div>
        )}
        <div>
          {notesArray.map((note) => {
            return (
              <div className={styles.notesInner} key={note.id}>
                <h4>{note.title}</h4>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
