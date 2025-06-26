import React from "react";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 px-4">
      <h1 className="text-4xl font-bold mb-8">EduClubs (Demo)</h1>
      <p className="mb-6 text-center max-w-md">
        Учись, делись, вдохновляй — создавай свои клубы знаний!
      </p>
      <button
        onClick={() => alert("В демо режиме вход не требуется")}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
      >
        Войти (Демо)
      </button>
    </div>
  );
}
