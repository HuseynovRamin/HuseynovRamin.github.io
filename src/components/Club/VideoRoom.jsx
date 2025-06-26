import React from "react";

export default function VideoRoom() {
  return (
    <div className="max-w-xl mx-auto mt-4">
      <iframe
        src="https://meet.jit.si/EduClubsRoom"
        style={{ height: "400px", width: "100%", border: 0 }}
        allow="camera; microphone; fullscreen; display-capture"
        title="EduClubs Video Room"
      ></iframe>
    </div>
  );
}
