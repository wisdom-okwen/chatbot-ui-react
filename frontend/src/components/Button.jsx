import React from "react";

function Button({ onSend }) {
    return (
        <button className="p-2 bg-blue-500 text-white rounded-r-md" onClick={onSend}>
            Send
        </button>
    );
}

export { Button }