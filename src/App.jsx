import ChatbotHeader from "./components/chatbotHeader";
import "./App.css";
import { FaArrowUp, FaRobot } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import Chat from "./components/chat";

export default function App() {
  
  const [userPrompt, setUserPrompt] = useState("");
  let [chatHistory, setChatHistory] = useState([
    { type: "bot", text: "Hai How May I help You?" },
  ]);
  const chatBodyRef = useRef();

  const updateChatHistory = (text) => {
    setChatHistory((prev) => [
      ...prev.filter((item) => item.text != "Thinking...."),
      { type: "bot", text: text },
    ]);
  };

  const submitForm = (e) => {
    e.preventDefault();
    alert(process.env.REACT_API_KEY)
    setChatHistory((prev) => [...prev, { type: "user", text: userPrompt }]);
    setChatHistory((prev) => [...prev, { type: "bot", text: "Thinking...." }]);
    generateResponse()
    /*
    setTimeout(() => {
      updateChatHistory("Hello Viswajith");
      setUserPrompt("");
    }, 600);*/
  };

  const APIKEY = "Your Api key";
  const generateResponse = async () => {
    chatHistory = chatHistory.map(({ type, text }) => ({
      role: type === "user" ? "user" : "bot", // Fix 3
    
      parts: [{ text }],
    }));
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${APIKEY}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ contents: chatHistory }),
      });

      if(!response.ok){
        throw new Error('Error Occured')
      }
      
      const data = await response.json();
      console.log(data);
      const apiResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text
  ? data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim()
  : "No response available";
 updateChatHistory(apiResponse);
      setUserPrompt("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    chatBodyRef.current.scrollTo({
      top: chatBodyRef.current.scrollHeight,
      behaviour: "smooth",
    });
  }, [chatHistory]);

  return (
    <div className="container">
      <div className="chatbot-popup">
        <ChatbotHeader />
        <div className="chats" ref={chatBodyRef}>
          {chatHistory.map((chat, index) => {
            return <Chat chat={chat.type} text={chat.text} key={index} />;
          })}
        </div>

        <div className="user-input">
          <form action="#" onSubmit={submitForm}>
            <input
              type="text"
              placeholder="Enter your Prompt "
              required
              onChange={(e) => setUserPrompt((prev) => e.target.value)}
              value={userPrompt}
            />
            <button>
              <FaArrowUp size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
