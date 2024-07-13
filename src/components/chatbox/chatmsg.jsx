import Avatar from "../avatar";
import Popover, { PopButton } from "../popover";

/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
function Chatmsg({messages, currentUser, currentChat, removeMsg}) {
    const userMessages = messages
        .filter(msg => (msg.userId === currentUser.id && msg.toId === currentChat.id) ||
            (msg.toId === currentUser.id && msg.userId === currentChat.id)
        ); 
    
    return (
        <div className="position-relative" style={{
            height: "calc(100vh - 240px)",
            overflowY: "scroll",
            }}>
                        <div className="chat-messages p-4">
                        {userMessages.map(message => {
                            const dateTime = new Date(message.dateTime).toLocaleString();
                            const resDateTime = dateTime.split(",")[1];

                          return(
                            <div key={message.id} className={currentUser.id === message.userId ? "chat-message-right pb-4" : "chat-message-left pb-4"}>
                             <Popover>
                               <PopButton text="Delete" handleOnClick={() => removeMsg(message)} />
                            </Popover>
                            <div>
                                <Avatar
                                    name={currentUser.id === message.userId ? currentUser.name : currentChat.name} 
                                    color={currentUser.id === message.userId ? currentUser.color : currentChat.color} 
                                />
                                <div className="text-muted small text-nowrap mt-2">{resDateTime.trim()}</div>
                            </div>
                            <div className="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                                <div className="font-weight-bold mb-1">{currentUser.id === message.userId ? "You" : currentChat.name }</div>
                                {message.messageInfo}
                            </div>
                        </div>

                              )
                          })}
                        </div>
                    </div>
    )
}

export default Chatmsg;