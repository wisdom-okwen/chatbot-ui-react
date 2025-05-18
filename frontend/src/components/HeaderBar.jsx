import React from "react";

function HeaderBar({ minimized, onToggle }) {
    return (
        <div className="h-12 bg-blue-600 text-white flex items-center justify-between px-4 font-semibold rounded-t-md">
            <span>Chatbot</span>
            <button
                className="text-white text-xl focus:outline-none"
                onClick={onToggle}
                title={minimized ? "Maximize" : "Minimize"}
            >
                {minimized ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4h16v16H4V4z" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                )}
            </button>
        </div>
    );
}

export { HeaderBar }
