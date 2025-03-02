import { FaRobot, FaTimes } from "react-icons/fa";
import './Header.css'

export default function ChatbotHeader(){
    return(
        <div className="header">
            <div className="left">
                
                <FaRobot size={25}/>
                <h2>V.I.S.W.A</h2>
            </div>
        </div>
    )
}