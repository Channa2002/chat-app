/* eslint-disable no-undef */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
import Search from "./search";
import Avatar from "../avatar";
import ChatGroup from "../chatTabs";
import { useState } from "react";
import Popover, { PopButton } from "../popover";
import { useAuth } from "../../customhooks/index";

// eslint-disable-next-line react/prop-types
function Chatusers({users, setChat, currentUser, searchUser, searchVal, isSettings, toggleSettings, addCurrentSetting}) {
    const [currentTab, setCurrentTab] = useState("General");
    const { logOut } = useAuth();
    
    return (
        <div className="col-12 col-lg-5 col-xl-3 border-right" style={{
            height: "calc(100vh - 90px)",
            overflowY: "scroll",
            }}> 
                
                {isSettings ? (
                    <>
                     <div style={{ margin: 5, border: "1px solid whitesmoke", width: 80, textAlign: "center" }}>
                        <PopButton text="Back" handleOnClick={toggleSettings} />
                     </div>
                     {["Profile", "Privacy"].map(item => {
                        return (
                            <a key={item} href="#" onClick={() => addCurrentSetting(item)} className="list-group-item list-group-item-action border-1">
                            <div className="d-flex align-items-start">
                                {/* <Avatar name={item} /> */}
                                <div className="flex-grow-1 ml-3">
                                    {item}
                                </div>
                            </div>
                        </a>
                        )
                    })}
                    </>
                ) : (
                    <>
                    <div className="list-group-item list-group-item-action border-0">
                        <div className="d-flex align-items-start">
                            <Avatar name={currentUser.name} color={currentUser.color}/>
                            <div className="flex-grow-1 ml-3">
                                {currentUser.name}
                                <div className="small"><span className="fas fa-circle chat-online"></span> {currentUser.status}</div>
                            </div>
                            <Popover>
                                <PopButton text="Settings" handleOnClick={toggleSettings} />
                                <PopButton text="Logout" handleOnClick={() => logOut()} />
                            </Popover>
                        </div>
                    </div>
                
                    <ChatGroup setCurrentTab={setCurrentTab} currentTab={currentTab} />
                    <Search searchUser={searchUser} /> 
                    {currentTab === "General" && (
                        <>
                        {users
                        .filter(user => user.name.toLowerCase().includes(searchVal.toLowerCase()) )
                        .filter(user => !currentUser.friend.includes(user.id)).map(user => {
                            return (
                                <a onClick={() => setChat(user)} key={user.id} href="#" className="list-group-item list-group-item-action border-0">
                                <div className="badge bg-success float-right">5</div>
                                <div className="d-flex align-items-start"> 
                                    <Avatar name={user.name} color={user.color} />
                                    <div className="flex-grow-1 ml-3">
                                        {user.name}
                                        <div className="small"><span className="fas fa-circle chat-online"></span> {user.status}</div>
                                    </div>
                                </div>
                            </a>
                            )
                        })}
                        </>
                    )}

                    {currentTab === "Friends" && (
                        <>
                            {users
                            .filter(user => user.name.toLowerCase().includes(searchVal.toLowerCase()))
                            .filter(user => currentUser.friend.includes(user.id)).map(user => {
                                return (
                                <a onClick={() => setChat(user)} key={user.id} href="#" className="list-group-item list-group-item-action border-0">
                                <div className="badge bg-success float-right">5</div>
                                <div className="d-flex align-items-start">
                                    <Avatar name={user.name} color={user.color}/>
                                    <div className="flex-grow-1 ml-3">
                                        {user.name}
                                        <div className="small"><span className="fas fa-circle chat-online"></span> {user.status}</div>
                                    </div>
                                </div>
                                </a>
                            );
                            })}
                        </>
                    )}
                    </>
                )}
               
                      <hr className="d-block d-lg-none mt-1 mb-0" />
                  </div>
    )
}

export default Chatusers;