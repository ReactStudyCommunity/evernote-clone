import Head from "next/head";
import styles from "../styles/Evernote.module.scss";
import NoteOperations from "./components/NoteOperations";
import NoteDetails from "./components/NoteDetails";
import { useState } from "react";
import { Nullable } from "../util/Nullable";

export default function Home() {
  const [id, setId] = useState<Nullable<number>>(null);

  const getSingleNote = (id: number) => {
    setId(id);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Evernote Clone</title>
        <meta name="description" content="This is an Evernote Clone" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.left}>
          <NoteOperations getSingleNote={getSingleNote} />
        </div>
        <div className={styles.right}>
          <NoteDetails id={id} />
        </div>
      </main>
    </div>
  );
}
