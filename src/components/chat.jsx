import { FaFilePdf, FaRobot } from "react-icons/fa";
import "./chat.css";
import jsPDF from "jspdf";

export default function Chat({ chat, text }) {

    const generatePdf = (chat) => {
        const doc = new jsPDF()
        doc.text(chat,10,10)
        doc.save("chat_response.pdf")
    }

  return (
    <div className={`${chat}-text`}>
      {chat == "bot" && <FaRobot size={27} style={{ flexShrink: 0 }} />}
      <span>
        {text}
        {chat == "bot" && (
          <FaFilePdf
            size={15}
            style={{ color: "gray", cursor: "pointer" }}
            onClick={() => generatePdf(text)}
          />
        )}
      </span>
    </div>
  );
}
