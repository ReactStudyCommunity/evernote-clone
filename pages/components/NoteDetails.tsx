import { useEffect } from "react";
import { app, database } from "../../firebaseConfig";
import { collection, doc, getDocs } from "firebase/firestore";
import { Note, noteConverter } from "../../models/Note";
import "react-quill/dist/quill.snow.css";

export default function NoteDetails({ id }) {
  const ReactQuill =
    typeof window === "object" ? require("react-quill") : () => false;
  const getSingleNote = async () => {
    if (id) {
      const docRef = collection(database, "notes").withConverter(noteConverter);
      await getDocs(docRef).then((data) => {
        data.docs.map((item) => {
          if (id === item.data().id) {
            console.log(item.data());
          }
        });
      });
    }
  };

  useEffect(() => {
    getSingleNote();
  }, [id]);

  return <></>;
}
