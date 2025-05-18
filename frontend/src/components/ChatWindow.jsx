import { marked } from 'marked';
import React, { useEffect, useState, useRef } from "react";
import { HeaderBar } from "./HeaderBar";
import { Input } from "./Input";


function ChatWindow() {
    const [minimized, setMinimized] = useState(false);
    const [inputVal, setInputVal] = useState('');
    const [messages, setMessages] = useState([]);
    const inputRef = useRef(null);
    const messagesEndRef = useRef(null);


    function addMessage(sender, message) {
        const messagesDiv = document.getElementById("messages");
        const messageDiv = document.createElement("div");
        messageDiv.className = `message ${sender}`;
        messageDiv.innerHTML = sender === 'user'
            ? `<div><em><strong id="you">You</strong></em><br /></div>${marked.parse(message)}`
            : sender === 'bot'
                ? `<div><strong id="bot">Bot</strong><br /></div>${marked.parse(message)}`
                : marked.parse(message);

        messagesDiv.appendChild(messageDiv);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }


    const handleSend = async () => {
        const userInput = inputVal;
        setMessages(prev => [...prev, { sender: 'user', text: userInput }]);
        setInputVal("");

        try{  
            const response = await fetch('http://localhost:3001/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({ message: userInput })
            });

            
          const data = await response.json();

          if (response.ok) {
            setMessages(prev => [...prev, { sender: 'bot', text: data.reply }]);
          } else {
            setMessages(prev => [...prev, { sender: 'bot', text: '⚠️ Error from server.' }]);
          }
        } catch (err) {
          console.error(err);
          setMessages(prev => [...prev, { sender: 'bot', text: '⚠️ Network error.' }]);
        }
    };

    useEffect(() => {      
        if (!minimized) {
            const messagesDiv = document.getElementById("messages");
            if (messagesDiv) {
              messagesDiv.scrollTop = messagesDiv.scrollHeight;
            }
          }
        if (!minimized && inputRef.current) {
            inputRef.current.focus();
        }
    }, [minimized]);
      
    useEffect(() => {
        if (messagesEndRef.current) {
          messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, [messages]);
      

    return (
        <div className={`fixed bottom-4 right-4 w-full max-w-md bg-white rounded-xl shadow-lg flex flex-col transition-all duration-300 ease-in-out ${minimized ? 'h-12' : 'h-chat'}`}>
            <HeaderBar minimized={minimized} onToggle={() => setMinimized(!minimized)} />
            {!minimized && (
                <div id='messages' className="flex-1 overflow-auto p-4 text-sm bg-gray-50">
                    {messages.map((message, index) => (
                        <div key={index} className={`message ${message.sender}`}>
                        <div>
                            <strong id={message.sender}>
                            {message.sender === 'user' ? 'You' : 'Bot'}
                            </strong>
                            <br />
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: marked.parse(message.text) }} />
                        </div>
                    ))}
                    <div ref={messagesEndRef}/>
                </div>
            )}
            {!minimized && (<div className="p-1 border-t bg-white rounded-lg w-full overflow-hidden">
                <Input 
                    inputRef={inputRef}
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    onSend={handleSend}
                />
            </div>)}
        </div>
    );
}


export { ChatWindow }