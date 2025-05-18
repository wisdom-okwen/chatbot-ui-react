import React, { useState }  from "react";
import { Button } from "./Button";

function Input({ value, onChange, onSend, inputRef }) {
    return (
        <div className="flex m-2">
            <input 
                ref={inputRef}
                className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none"
                placeholder="Enter your question..."
                onChange={onChange}
                value={value}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      onSend();
                    }
                  }}
            />
            <Button onSend={onSend}/>
        </div>
    );
}

export { Input }