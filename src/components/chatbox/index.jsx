/* eslint-disable react/prop-types */
import Chatheader from "./chatheader";
import Chatmsg from "./chatmsg";
import Chatinput from "./chatinput";

// eslint-disable-next-line react/prop-types
function Chatbox({currentUser, currentChat, addFriend, loadingAddFriend, width, addSetIsHome, loadingMsg, messages, setMessageData, removeMsg}) {

    const msgSend = (msg) => {
        setMessageData({
            messageInfo: msg,
            dateTime: `${new Date()}`,
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
                    isFriend={currentUser?.friend.includes(currentChat.id)}
                    loadingAddFriend={loadingAddFriend}
                    width={width}
                    addSetIsHome={addSetIsHome}
                    loadingMsg={loadingMsg}
                 />
                 <Chatmsg messages={messages} currentUser={currentUser} currentChat={currentChat} removeMsg={removeMsg} loadingMsg={loadingMsg}/> 
                 <Chatinput msgSend={msgSend} isOff={loadingMsg} />
                </>
            )}
        </div>
    )
}

export default Chatbox;