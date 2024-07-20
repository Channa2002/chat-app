import Avatar from "../avatar";
import { LoaderSimple } from "../loader";
import { IoChevronBack } from "react-icons/io5";

/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
function Chatheader({currentChat, addFriend, isFriend, loadingAddFriend, width, addSetIsHome}) {

    return (
        <div className="py-2 px-4 border-bottom d-lg-block">
            <div className="d-flex align-items-center py-1">
                {width < 1025 && (
                    <IoChevronBack onClick={addSetIsHome} fontSize={25} style={{ marginRight: 15, cursor: "pointer" }} />
                )}
                <div className="position-relative">
                   <Avatar name={currentChat.name} color={currentChat.color}/>
                </div>
                <div className="flex-grow-1 pl-3">
                    <strong>{currentChat.name}</strong>
                    <div className="text-muted small"><em>Typing...</em></div>
                </div>  
                <button type="button" className="btn btn-light" 
                    onClick={() => {
                        addFriend(isFriend ? "remove" : "add", currentChat);
                    }} 
                >
                    {loadingAddFriend ? (
                        <LoaderSimple />
                    ) : (
                        <>
                        {isFriend ? "UnFriend" : "Add Friend"}
                        </>
                    )}
                </button>              
            </div>

        </div>
    )
}

export default Chatheader;