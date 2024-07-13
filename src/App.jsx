import Layout from './components/layout';
import Chatusers from './components/chatusers';
import Chatbox from './components/chatbox';
import './App.css';
import { useEffect, useState } from 'react';
// import usersData from './users';
import { useNavigate } from 'react-router-dom';
// import messagesData from './messages';
import { useAuth } from './customhooks';
import apiCall from './api';
import Privacy from "./components/privacy"
import Profile from './components/profile';
import Loader from './components/loader';
// import SocketIOClient from "socket.io-client";
// import { BASE_URL_SOCKET } from "./api/index";

function App() {
const { accessToken } = useAuth();
const navigate = useNavigate();
const [users, setUsers] = useState([]);
const [messages, setMessages] = useState([]);
const [currentUser, setCurrentUser] = useState({});
const [currentChat, setCurrentChat] = useState(null);
const [searchVal, setSearchVal] = useState("");
const [loading, setLoading] = useState(true);
const [isSettings, SetIsSettings] = useState(false);
const [currentSetting, setCurrentSetting] = useState("profile");

// console.log(users, "-->", currentUser, "-->", messages  )

const addCurrentSetting = (data) => {
  setCurrentSetting(data)
}


const handleFetchUsers = async () => {
  const res = await apiCall.get("/user");
  console.log("api", res);
  setUsers(res.data);
}

const handleMessages = async (userId) => {
  const res = await apiCall.get(`/chat?userId=${userId}`);
  setMessages(res.data);
}

const handleLogin = async () => {
  const localUser = localStorage.getItem("chatlogin");
  const parseLocalUser = localUser ? JSON.parse(localUser) : null;
  let userId = undefined;
  if (parseLocalUser && parseLocalUser.id) {
    setCurrentUser(parseLocalUser);
    userId = parseLocalUser.id;
  } else {
    const res = await apiCall.post("/login", { token: accessToken });
    setCurrentUser(res.data);
    userId = res.data.id;
    localStorage.setItem("chatlogin", JSON.stringify(res.data));
  }
  await handleFetchUsers();
  await handleMessages(userId);
  setLoading(false);
}

const toggleSettings = () => {
  SetIsSettings(prev => !prev);
}

function addFriend(type, user) {
    setUsers(prev => prev.map(data => {
      if(currentUser.id === data.id) {
          data.friend = type === "add"
            ? data.friend.includes(user.id) ? data.friend : [...data.friend, user.id]
            : data.friend.filter(frnd => frnd !== user.id);
      }
      return data;
     }));
  
     setCurrentUser(prev => {
      return {
        ...prev,
        friend: type === "add"
          ? prev.friend.includes(user.id) ? prev.friend : [...prev.friend, user.id]
          : prev.friend.filter(frnd => frnd !== user.id),
      }
     });  
}

const setChat = (user) => {
  setCurrentChat(user);
}

const setMessageData = async (msg) => {
  const id = new Date();
  setMessages(prev => [...prev, { ...msg, id }]);
  const res = await apiCall.post(`/chat`, msg);
  setMessages(prev => {
    if (prev.id === id) {
      return res.data;
    }
    return prev;
  });
}

const searchUser = (name) => {
  setSearchVal(name);
}

async function removeMsg(msgData) {
  await apiCall.delete(`/chat/${msgData.id}`);
  setMessages(prev => prev.filter(data => data.id !== msgData.id));
}

useEffect(() => {
  if (!accessToken) {
    navigate("/login");
  }
  
  if (accessToken && accessToken !== "no") {
    handleLogin();
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [accessToken]);

// useEffect(() => {
//   // connect to socket server
//   const socket = SocketIOClient.connect(BASE_URL_SOCKET, {
//     path: "/api/socketio",
//   });

//   // log socket connection
//   socket.on("connect", () => {
//     console.log("SOCKET CONNECTED!", socket.id);
//     // setConnected(true);
//   });

//   // update chat on new message dispatched
//   // socket.on("message", (message) => {
//   //   chat.push(message);
//   //   setChat([...chat]);
//   // });

//   // socket disconnet onUnmount if exists
//   if (socket) return () => socket.disconnect();
// }, []);

  return loading ? ( <Loader /> ) : (
    <Layout >
      {currentUser?.id && (
        <Chatusers 
          users={users} 
          setChat={setChat} 
          currentUser={currentUser}
          searchUser={searchUser}
          searchVal={searchVal}
          isSettings={isSettings}
          toggleSettings={toggleSettings}
          addCurrentSetting={addCurrentSetting}
        />
      )}
      {!isSettings && currentChat && (
        <Chatbox 
          messages={messages} 
          currentUser={currentUser} 
          currentChat={currentChat} 
          setMessageData={setMessageData} 
          addFriend={addFriend}
          removeMsg={removeMsg}
        />
      )}
      {isSettings && currentSetting === "Profile" && <Profile currentUser={currentUser}/>}
      {isSettings && currentSetting === "Privacy" && <Privacy currentUser={currentUser}/>}
    </Layout>
  )
}

export default App
