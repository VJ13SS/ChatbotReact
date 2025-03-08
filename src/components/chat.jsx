import { FaCopy, FaFilePdf, FaRobot } from "react-icons/fa";
import "./chat.css";
import jsPDF from "jspdf";

export default function Chat({ chat, text }) {
  const generatePdf = (chat) => {
    const doc = new jsPDF();
    const marginLeft = 10
    const marginTop = 10

    doc.setFontSize(16)
    
    doc.text(chat, marginLeft, marginTop,{maxWidth: 180});
    doc.save("chat_response.pdf");
  };

  const copyText = (chat) => {
    navigator.clipboard
      .writeText(chat)
      .then(() => console.log("text copied"))
      .catch(() => console.log("error"));
  };

  return (
    <div className={`${chat}-text`}>
      {chat == "bot" && <FaRobot size={27} style={{ flexShrink: 0 }} />}
      <span>
        {text}
        {chat == "bot" && (
          <div className="icons">
            <FaFilePdf
              size={15}
              style={{ color: "gray", cursor: "pointer" }}
              onClick={() => generatePdf(text)}
            />
            <FaCopy
              size={15}
              style={{ color: "gray", cursor: "pointer" }}
              onClick={() => copyText(text)}
            />
          </div>
        )}
      </span>
    </div>
  );
}
