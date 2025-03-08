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

  //localStorage.clear()
  const submitForm = (e) => {
    e.preventDefault();

    setChatHistory((prev) => [...prev, { type: "user", text: userPrompt }]);

    setChatHistory((prev) => [...prev, { type: "bot", text: "Thinking...." }]);
    generateResponse();
    setUserPrompt("");
    /*setTimeout(() => {
      updateChatHistory(
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci, quas ab vel soluta facere voluptatibus ut. Sequi, a! Minus voluptas hic tempore deleniti natus, quae exercitationem temporibus illum odit voluptatibus?"
      );
      setUserPrompt("");
    }, 600);*/
  };

  const generateResponse = async () => {
    try {
      const url = `http://127.0.0.1:5000/response`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: userPrompt }),
      });

      if (!response.ok) {
        throw new Error("Error Occured");
      }

      const data = await response.json();
      console.log(data);

      updateChatHistory(data["response"]);
      localStorage.setItem(
        "chat-history",
        JSON.stringify([
          ...chatHistory.filter((item) => item.text != "Thinking...."),
          { type: "user", text: userPrompt },
          { type: "bot", text: data["response"] },
        ])
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let chats = JSON.parse(localStorage.getItem("chat-history"));
    console.log(chats, chatHistory);
    setChatHistory(chats || [{ type: "bot", text: "Hai How May I help You?" }]);
  }, []);

  useEffect(() => {
    chatBodyRef.current.scrollTo({
      top: chatBodyRef.current.scrollHeight,
      behaviour: "smooth",
    });
  }, [chatHistory]);

  return (
    <div className="container">
      <div className="chatbot-popup">
        <ChatbotHeader setChatHistory={setChatHistory} />
        <div className="logo">
          <img src="./logo.jpg" alt="" />
        </div>
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
