import { marked } from 'marked';
import React, { useEffect, useState } from "react";
import { HeaderBar } from "./HeaderBar";
import { Input } from "./Input";


function ChatWindow() {
    const [minimized, setMinimized] = useState(false);
    const [inputVal, setInputVal] = useState('');
    const [messages, setMessages] = useState([]);

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


    const handleSend = () => {
        addMessage('user', inputVal)
        addMessage('bot', inputVal)
        setInputVal("");
    };

    useEffect(() => {
        // Code that runs every time `minimized` changes
        console.log("Minimized changed:", minimized);
      
        if (!minimized) {
            const messagesDiv = document.getElementById("messages");
            if (messagesDiv) {
              messagesDiv.scrollTop = messagesDiv.scrollHeight;
            }
          }
        // if (!minimized && inputRef.current) {
        //     inputRef.current.focus();
        // }
          
      
      }, [minimized]);
      

    return (
        <div className={`fixed bottom-4 right-4 w-full max-w-md bg-white rounded-xl shadow-lg flex flex-col transition-all duration-300 ease-in-out ${minimized ? 'h-12' : 'h-chat'}`}>
            <HeaderBar minimized={minimized} onToggle={() => setMinimized(!minimized)} />
            {!minimized && (
                <div id='messages' className="flex-1 overflow-auto p-4 text-sm bg-gray-50">
                    {/* This will be where messages go */}
                </div>
            )}
            {!minimized && (<div className="p-1 border-t bg-white rounded-lg w-full overflow-hidden">
                <Input 
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    onSend={handleSend}
                />
            </div>)}
        </div>
    );
}


export { ChatWindow }