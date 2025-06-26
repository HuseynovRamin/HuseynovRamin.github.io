import React, { useState } from "react";

const mockAssignments = [
  { id: 1, title: "Домашнее задание 1", fileUrl: "" },
  { id: 2, title: "Практика чтения", fileUrl: "" },
];

export default function Assignments() {
  const [assignments, setAssignments] = useState(mockAssignments);
  const [title, setTitle] = useState("");

  const addAssignment = () => {
    if (!title.trim()) return alert("Введите название");
    setAssignments([...assignments, { id: Date.now(), title, fileUrl: "" }]);
    setTitle("");
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
        <button
          onClick={addAssignment}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Добавить задание
        </button>
      </div>

      <h3 className="font-semibold mb-2">Список заданий</h3>
      <ul>
        {assignments.map((a) => (
          <li key={a.id} className="mb-2">
            {a.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
