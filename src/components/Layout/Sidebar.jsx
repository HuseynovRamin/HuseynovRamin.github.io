import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-md h-screen p-5 space-y-6">
      <h2 className="text-xl font-bold text-blue-600">EduClubs</h2>
      <nav className="flex flex-col space-y-2">
        <Link to="/dashboard" className="text-blue-600">
          Мои клубы
        </Link>
        <Link to="/create-club">Создать клуб</Link>
        <Link to="/schedule">Расписание</Link>
        <Link to="/notifications">Уведомления</Link>
        <Link to="/profile">Профиль</Link>
      </nav>
    </aside>
  );
}
