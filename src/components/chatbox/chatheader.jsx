import Avatar from "../avatar";

/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
function Chatheader({currentChat, addFriend, isFriend}) {
    return (
        <div className="py-2 px-4 border-bottom d-none d-lg-block">
            <div className="d-flex align-items-center py-1">
                <div className="position-relative">
                   <Avatar name={currentChat.name} color={currentChat.color}/>
                </div>
                <div className="flex-grow-1 pl-3">
                    <strong>{currentChat.name}</strong>
                    <div className="text-muted small"><em>Typing...</em></div>
                </div>  
                <button type="button" className="btn btn-light" 
                    onClick={() => addFriend(isFriend ? "remove" : "add", currentChat)} 
                >
                    {isFriend ? "UnFriend" : "Add Friend"}
                </button>              
            </div>

        </div>
    )
}

export default Chatheader;