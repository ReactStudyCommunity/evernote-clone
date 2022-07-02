import { useState, useEffect } from "react";
import styles from "../../styles/Evernote.module.scss";
import { Note, noteConverter } from "../../models/Note";
import { app, database } from "../../firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";

// RichTextView
import "react-quill/dist/quill.snow.css";

export default function NoteOperations({ getSingleNote }) {
  const [isInputVisible, setInputVisible] = useState(false);

  const dbInstance = collection(database, "notes");
  const ReactQuill =
    typeof window === "object" ? require("react-quill") : () => false;
  const [notesArray, setNotesArray] = useState<Note[]>([]);

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

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <>
      <div className={styles.btnContainer}>
        <div>
          {notesArray.map((note) => {
            return (
              <div
                className={styles.notesInner}
                onClick={() => getSingleNote(note.id)}
                key={note.id}
              >
                <h4>{note.title}</h4>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
