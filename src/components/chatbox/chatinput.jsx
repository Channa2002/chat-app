import { useState } from "react";

// eslint-disable-next-line react/prop-types
function Chatinput({msgSend, isOff}) {
    const [msg, setMsg] = useState("");
    
    return (
        <div className="flex-grow-0 py-3 px-4 border-top">
            <div className="input-group">
                <input 
                    value={msg} 
                    onChange={(e) => setMsg(e.target.value)} 
                    onKeyDown={(e) => {
                        if(e.key === "Enter") {
                         msgSend(msg);
                         setMsg("");
                        }
                    }}
                    type="text" 
                    className="form-control" 
                    placeholder="Type your message" 
                    disabled={isOff}
                />
                <button className="btn btn-primary" disabled={isOff}
                    onClick={() => {
                    msgSend(msg);
                    setMsg("");
                }}>Send</button>
            </div>
        </div>
    )
}

export default Chatinput;