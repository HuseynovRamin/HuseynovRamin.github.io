import React from "react";
import { auth, provider } from "../../firebase";
import { signInWithPopup } from "firebase/auth";

export default function Login() {
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 px-4">
      <h1 className="text-4xl font-bold mb-8">EduClubs</h1>
      <p className="mb-6 text-center max-w-md">
        Учись, делись, вдохновляй — создавай свои клубы знаний!
      </p>
      <button
        onClick={signInWithGoogle}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
      >
        Войти через Google
      </button>
    </div>
  );
}
