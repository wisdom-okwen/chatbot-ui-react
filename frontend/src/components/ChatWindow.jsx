import React, { useState } from "react";
import { HeaderBar } from "./HeaderBar";
import { Input } from "./Input";


function ChatWindow() {
    const [minimized, setMinimized] = useState(false);

    return (
        <div className="fixed bottom-4 right-4 w-full max-w-md h-chat bg-white rounded-xl shadow-lg flex flex-col">
            <HeaderBar />
            {!minimized && (
                <div className="flex-1 overflow-auto p-4 text-sm bg-gray-50 ">
                    {/* This will be where messages go */}
                    <p>Chat content...</p>
                </div>
            )}
            <div className="p-1 border-t bg-white rounded-lg w-full overflow-hidden">
                <Input />
            </div>
        </div>
    );
}


export { ChatWindow }