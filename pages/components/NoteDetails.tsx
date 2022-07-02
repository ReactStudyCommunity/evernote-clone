import { useState, useEffect } from "react";
import { app, database } from "../../firebaseConfig";
import styles from "../../styles/Evernote.module.scss";
import { collection, doc, getDocs, addDoc } from "firebase/firestore";
import { Note, noteConverter } from "../../models/Note";
import "react-quill/dist/quill.snow.css";
import { Nullable } from "../../util/Nullable";

export default function NoteDetails({ id }) {
  const ReactQuill =
    typeof window === "object" ? require("react-quill") : () => false;
  const [singleNote, setSingleNote] = useState<Nullable<Note>>(null);
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [isEdit, setIsEdit] = useState(false);
  const dbInstance = collection(database, "notes");

  const getEditData = () => {
    setIsEdit(true);
  };

  const getSingleNote = async () => {
    if (id) {
      const docRef = dbInstance.withConverter(noteConverter);
      await getDocs(docRef).then((data) => {
        data.docs.map((item) => {
          if (id === item.data().id) {
            setSingleNote(item.data());
          }
        });
      });
    }
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
    getSingleNote();
  }, [id]);

  return (
    <>
      <button className={styles.editBtn}>Edit</button>
      <button className={styles.deleteBtn}>Delete</button>
      {isEdit && (
        <div className={styles.inputContainer}>
          <input
            className={styles.input}
            placeholder="Enter the title..."
            value={singleNote?.title}
          />
          <div className={styles.ReactQuill}>
            <ReactQuill onChange={setDesc} value={desc} />
          </div>
          <button className={styles.saveBtn} onClick={saveNote}>
            Update Note
          </button>
        </div>
      )}
      {singleNote !== null && (
        <>
          <h2>{singleNote.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: singleNote.desc }}></div>
        </>
      )}
    </>
  );
}
