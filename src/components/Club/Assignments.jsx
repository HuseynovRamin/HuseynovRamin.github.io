import React, { useEffect, useState } from "react";
import { db, storage } from "../../firebase";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "clubs", "clubID", "assignments"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAssignments(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return unsubscribe;
  }, []);

  const uploadAssignment = async () => {
    if (!title) return alert("Введите название");
    let fileUrl = "";
    if (file) {
      const fileRef = ref(storage, `assignments/${file.name}`);
      await uploadBytes(fileRef, file);
      fileUrl = await getDownloadURL(fileRef);
    }

    await addDoc(collection(db, "clubs", "clubID", "assignments"), {
      title,
      fileUrl,
      createdAt: serverTimestamp(),
    });

    setTitle("");
    setFile(null);
  };

  return (
    <div className="max-w-xl mx-auto bg-gray-100 p-4 rounded">
      <div className="mb-4">
        <input
          className="w-full p-2 mb-2 border rounded"
          placeholder="Название задания"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-2"
        />
        <button
          onClick={uploadAssignment}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Добавить задание
        </button>
      </div>

      <h3 className="font-semibold mb-2">Список заданий</h3>
      <ul>
        {assignments.map((a) => (
          <li key={a.id} className="mb-2">
            {a.title}{" "}
            {a.fileUrl && (
              <a
                href={a.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                Скачать
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
