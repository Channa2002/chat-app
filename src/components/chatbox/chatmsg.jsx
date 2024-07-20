import { useEffect, useRef } from "react";
import Avatar from "../avatar";
import Popover, { PopButton } from "../../components/popover";

/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
function Chatmsg({messages, currentUser, currentChat, removeMsg}) {
    const chatRef = useRef(null);
    const userMessages = messages.filter(msg => (msg.userId === currentUser.id && msg.toId === currentChat.id) ||
        (msg.toId === currentUser.id && msg.userId === currentChat.id)
    );
    //dataFilter.filter((data, index) => dataFilter.findIndex(item => item.id === data.id) === index); 

    useEffect(() => {
        if(chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div ref={chatRef} className="position-relative" style={{
            height: "calc(100vh - 240px)",
            overflowY: "scroll",
            }}>
                        <div className="chat-messages p-4">
                        {userMessages.sort((data1, data2) => +data1.dateTime - +data2.dateTime).map(message => {
                            const dateTime = new Date(message.dateTime).toLocaleTimeString([], { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
                            const resDateAmPm = dateTime.split(" ");
                            const resAmPm = resDateAmPm[1].toUpperCase();
                            const resDateStr = resDateAmPm[0].split(":");
                            const resDateTime = `${resDateStr[0]}:${resDateStr[1]} ${resAmPm}`;

                          return(
                            <div key={message.id} className={currentUser.id === message.userId ? "chat-message-right pb-4" : "chat-message-left pb-4"}>
                             <Popover>
                               <PopButton text="Delete" handleOnClick={() => removeMsg(message)} />
                            </Popover>
                            <div>
                                {/* <Avatar
                                    name={currentUser.id === message.userId ? currentUser.name : currentChat.name} 
                                    color={currentUser.id === message.userId ? currentUser.color : currentChat.color} 
                                /> */}
                                
                            </div>
                            <div className="flex-shrink-1 bg-light rounded py-2 px-3 mr-1" style={{  boxShadow: "rgba(14, 63, 126, 0.06) 0px 0px 0px 1px, rgba(42, 51, 70, 0.03) 0px 1px 1px -0.5px, rgba(42, 51, 70, 0.04) 0px 2px 2px -1px, rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px, rgba(42, 51, 70, 0.03) 0px 5px 5px -2.5px, rgba(42, 51, 70, 0.03) 0px 10px 10px -5px, rgba(42, 51, 70, 0.03) 0px 24px 24px -8px", }}>
                                {/* <div className="font-weight-bold mb-1">{currentUser.id === message.userId ? "You" : currentChat.name }</div> */}
                                {message.messageInfo}
                                <div className="text-muted small text-nowrap mt-2" style={{ fontSize: "60%", justifySelf: "flex-end" }}>{resDateTime.trim()}</div>
                            </div>
                        </div>

                              )
                          })}
                        </div>
                    </div>
    )
}

export default Chatmsg;