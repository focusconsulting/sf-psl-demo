import { AudioRecorder } from "react-audio-voice-recorder";
import axios from "axios";
import { useCopilotChat } from "@copilotkit/react-core";

type ChatProps = {
  children: JSX.Element;
};

type AudioResponse = {
  text: string;
};

const Chat = ({ children }: ChatProps) => {
  const { visibleMessages, append, isLoading } = useCopilotChat({});

  const postAudio = (blob: Blob) => {
    const formData = new FormData();
    formData.append("audio", blob, "audio.wav");
    axios.post("http://localhost:3100/audio", formData).then((resp) => {
      const data = resp.data as AudioResponse;
      append({
        content: data.text,
        role: "user",
      });
    });
  };

  return (
    <>
      {children}
      {visibleMessages.length > 0 && (
        <div className="absolute bottom-48 right-8 bg-slate-1 h-100 p-20 rounded overflow-auto">
          <div>
            {visibleMessages.map((message, idx) => (
              <div key={idx}>{message.content}</div>
            ))}
          </div>
          {isLoading && <div>...</div>}
        </div>
      )}
      <div className="absolute bottom-8 right-8">
        <AudioRecorder
          onRecordingComplete={postAudio}
          audioTrackConstraints={{
            noiseSuppression: true,
            echoCancellation: true,
          }}
          downloadFileExtension="wav"
        />
      </div>
    </>
  );
};

export default Chat;
