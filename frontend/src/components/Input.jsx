import React, { useState }  from "react";
import { Button } from "./Button";

function Input() {
    const [inputVal, setInputVal] = useState('');

    const handleInputChange = (event) => {
        setInputVal(event.target.value);
    }

    return (
        <div className="flex m-2">
            <input 
                className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none"
                placeholder="Enter your question..."
                onChange={handleInputChange}
                value={inputVal}
            />
            <Button />
        </div>
    );
}

export { Input }