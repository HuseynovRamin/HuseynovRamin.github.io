import React, { useEffect, useState, useRef } from "react";
import { db, auth } from "../../firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const q = query(
      collection(db, "clubs", "clubID", "messages"),
      orderBy("createdAt")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (newMsg.trim() === "") return;
    await addDoc(collection(db, "clubs", "clubID", "messages"), {
      text: newMsg,
      uid: auth.currentUser.uid,
      displayName: auth.currentUser.displayName,
      createdAt: serverTimestamp(),
    });
    setNewMsg("");
  };

  return (
    <div className="bg-gray-100 p-4 rounded-md max-w-xl mx-auto">
      <div className="h-64 overflow-y-auto mb-2 space-y-2">
        {messages.map((msg) => (
          <div key={msg.id} className="text-sm">
            <b>{msg.displayName}: </b> {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          className="flex-1 border rounded px-3 py-2"
          placeholder="Написать сообщение..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
        >
          Отправить
        </button>
      </div>
    </div>
  );
}
