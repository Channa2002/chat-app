/* eslint-disable react/prop-types */
import Chatheader from "./chatheader";
import Chatmsg from "./chatmsg";
import Chatinput from "./chatinput";

// eslint-disable-next-line react/prop-types
function Chatbox({messages, currentUser, currentChat, setMessageData, addFriend, removeMsg, loadingAddFriend}) {

    const msgSend = (msg) => {
        setMessageData({
            messageInfo: msg,
            dateTime: new Date(),
            userId: currentUser.id,
            toId: currentChat.id
        },);
    }

    return (
        <div className="col-12 col-lg-7 col-xl-9">
            {currentChat && (
                <>
                 <Chatheader 
                    currentChat={currentChat} 
                    currentUser={currentUser} 
                    addFriend={addFriend} 
                    isFriend={currentUser.friend.includes(currentChat.id)}
                    loadingAddFriend={loadingAddFriend}
                 />
                 <Chatmsg messages={messages} currentUser={currentUser} currentChat={currentChat} removeMsg={removeMsg}/>
                 <Chatinput msgSend={msgSend} />
                </>
            )}
        </div>
    )
}

export default Chatbox;