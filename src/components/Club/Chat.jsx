import React, { useState } from "react";

const mockMessages = [
  { id: 1, displayName: "Анна", text: "Привет всем!" },
  { id: 2, displayName: "Иван", text: "Готов к занятию." },
];

export default function Chat() {
  const [messages, setMessages] = useState(mockMessages);
  const [newMsg, setNewMsg] = useState("");

  const sendMessage = () => {
    if (newMsg.trim() === "") return;
    setMessages([...messages, { id: Date.now(), displayName: "Вы", text: newMsg }]);
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
