import React from "react";

export default function Dashboard() {
  const clubs = [
    {
      id: "1",
      name: "Клуб английского",
      description: "Подготовка к IELTS",
      members: 24,
    },
    {
      id: "2",
      name: "Клуб рисования",
      description: "Учим акварель и диджитал",
      members: 12,
    },
  ];

  return (
    <main className="flex-1 p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Ваши клубы</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clubs.map((club) => (
          <div
            key={club.id}
            className="bg-white p-4 rounded-xl shadow cursor-pointer"
          >
            <h3 className="font-semibold text-lg">{club.name}</h3>
            <p className="text-gray-500 text-sm">{club.description}</p>
            <span className="text-xs text-gray-400">{club.members} участников</span>
          </div>
        ))}
      </div>
    </main>
  );
}
