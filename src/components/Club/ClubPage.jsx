import React from "react";
import Chat from "./Chat";
import Assignments from "./Assignments";
import VideoRoom from "./VideoRoom";

export default function ClubPage() {
  return (
    <div>
      <header className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-6">
        <h1 className="text-3xl font-bold">Клуб IELTS</h1>
        <p className="text-sm">Подготовка, советы, практика и задания</p>
      </header>

      <nav className="flex gap-4 px-6 py-4 border-b border-gray-200 bg-white sticky top-0 z-10">
        <a href="#" className="font-semibold text-blue-600">
          Главная
        </a>
        <a href="#">Обсуждения</a>
        <a href="#">Задания</a>
        <a href="#">Видеоуроки</a>
        <a href="#">Материалы</a>
      </nav>

      <main className="p-6 space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-2">Объявление от преподавателя</h2>
          <p>Следующее занятие в пятницу в 17:00 по Zoom. Домашка до четверга!</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">Чат клуба</h2>
          <Chat />
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">Задания</h2>
          <Assignments />
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-2">Видеоуроки</h2>
          <VideoRoom />
        </section>
      </main>
    </div>
  );
}
