import React from "react";

function Button() {
    const handleButtonClicked = (event) => {
        return;
    }
    return (
        <button className="p-2 bg-blue-500 text-white rounded-r-md" onClick={handleButtonClicked}>
            Send
        </button>
    );
}

export { Button }