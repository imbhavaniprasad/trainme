import React, { useEffect, useState } from 'react'
import { FileContext } from '../App';
import { useContext } from 'react';
import axios from 'axios';
import "../App.css"
const ChatWindow = () => {
    const currentFile = useContext(FileContext);
    const [message, setMessage] = useState('');
    const [historyChats, setHistoryChats] = useState([]);
    const [messageLoading, setMessageLoading] = useState(false);
    console.log(currentFile);
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    }
    const fetchAnswer = async () => {
        await axios.post('http://localhost:5000/get-answer', {
            'question': message,
            'nameSpace': currentFile.nameSpace
        }).then((response) => {
            console.log("answer", response)
            setHistoryChats(prevChats => [...prevChats, {
                'isUser': false,
                'text': response.data.answer
            }])
        }).catch((error) => console.log(error))
    }
    const handleSubmit = async () => {
        //  const data = e.target.value;
        setHistoryChats(prevChats => [...prevChats, {
            'isUser': true,
            'text': message
        }])
        setMessage('');
        setMessageLoading(true);
        await fetchAnswer();
        setMessageLoading(false);
    }
    return (
        <div className="main">
            <h1>{currentFile.title ? currentFile?.title : "Revise"}</h1>
            <ul className="feed">
                {historyChats.map((chat, index) => {
                    return <li key={index}>
                        <p style={{ fontSize: '16px' }}>{chat.isUser ? "User :" : "Bot :"} {chat.text}</p>
                    </li>
                })}
                {messageLoading && <li>
                    <p style={{ fontSize: '16px' }}>Bot : Thinking...</p>
                </li>}
            </ul>
            <div className="bottom-section">
                <div className="input-container">
                    <input placeholder={`chat with ${currentFile.title}`} onKeyDown={handleKeyDown} className='chat-input' onChange={(e) => setMessage(e.target.value)} value={message} />
                    <div id="submit" onClick={handleSubmit}>➢</div>
                </div>
                <p className="info" >
                    Ask anything related to the uploaded file
                </p>
            </div>
        </div>
    )
}

export default ChatWindow