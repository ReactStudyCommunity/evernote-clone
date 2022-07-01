import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
} from "firebase/firestore";

export type Note = {
  readonly id: number; // idは一意である必要があるためreadonlyを設定
  title: string;
  desc: string;
};

export const noteConverter: FirestoreDataConverter<Note> = {
  toFirestore(note: Note): DocumentData {
    return {
      id: note.id,
      title: note.title,
      desc: note.desc,
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Note {
    const data = snapshot.data(options);
    // Note オブジェクトの id プロパティには Firestore ドキュメントの id を入れる。
    return {
      id: data.id,
      title: data.title,
      desc: data.desc,
    };
  },
};
