import { FaRobot, FaTimes } from "react-icons/fa";
import "./Header.css";
import { FaPencil } from "react-icons/fa6";

export default function ChatbotHeader({ setChatHistory }) {
  const newChat = () => {
    confirm('Do you wish to start a new chat?');
    localStorage.setItem(
      "chat-history",
      JSON.stringify([{ type: "bot", text: "Hai How May I help You?" }])
    );
    setChatHistory([{ type: "bot", text: "Hai How May I help You?" }]);
  };
  return (
    <div className="header">
      <div className="left">
        <FaRobot size={25} />
        <h2>V.I.S.W.A</h2>
      </div>
      <FaPencil onClick={() => newChat()} />
    </div>
  );
}
