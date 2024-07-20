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
import { getChats, addChat, deleteChat, login } from "./api/firestore";
import { db } from "./firebaseConfig";
import { onSnapshot, query, collection, where, or } from "firebase/firestore";
// const { BrowserWindow } = require('electron');

// const win = new BrowserWindow();
// const tabId = win.webContents.id;

function App() {
const { accessToken } = useAuth();
const navigate = useNavigate();
const [users, setUsers] = useState([]);
const [messages, setMessages] = useState([]);
const [newMsgRelay, setNewMsgRelay] = useState({});
const [currentUser, setCurrentUser] = useState({});
const [currentChat, setCurrentChat] = useState(null);
const [searchVal, setSearchVal] = useState("");
const [loading, setLoading] = useState(true);
const [isSettings, SetIsSettings] = useState(false);
const [currentSetting, setCurrentSetting] = useState("profile");
const [loadingMsg, setLoadingMsg] = useState(false);
const [loadingAddFriend, setLoadingAddFriend] = useState(false);
const [width, setWidth] = useState(window.innerWidth);
const [isHome, SetIsHome] = useState(true);

console.log(users, "-->", currentUser, "-->", messages  );

console.log("==>", width);

const addCurrentSetting = (data) => {
  setCurrentSetting(data)
}


const handleFetchUsers = async () => {
  const res = await apiCall.get("/user");
  console.log("api", res);
  setUsers(res.data);
}

const handleMessages = async (userId) => {
  const results = await getChats(userId);
  setMessages(results);
}

const handleLogin = async () => {
  const localUser = localStorage.getItem("loginuser");
  const parseLocalUser = localUser ? JSON.parse(localUser) : null;
  let userId = undefined;
  if (parseLocalUser && parseLocalUser.id) {
    setCurrentUser(parseLocalUser);
    userId = parseLocalUser.id;
  } else {
    const result = await login(accessToken);
    console.log("result", result);
    // setCurrentUser(result);
    // userId = result.id;
    // localStorage.setItem("loginuser", JSON.stringify(result));
  }
  setLoading(false);
}

const toggleSettings = () => {
  SetIsSettings(prev => !prev);
}

async function addFriend(type, user) {
  console.log("In add Friend");
  setLoadingAddFriend(true);
  const runFunc = (type, friend, user) => {
    return type === "add"
      ? friend.includes(user.id) ? friend : [...friend, user.id]
      : friend.filter(frnd => frnd !== user.id);
  }
  const payload = runFunc(type, currentUser.friend, user);
  const res = await apiCall.put(`/user/${currentUser.id}`, { userData: { friend: payload } });
  console.log(res);
    setUsers(prev => prev.map(data => {
      if(currentUser.id === data.id) {
          data.friend = payload;
      }
      return data;
     }));
  
     setCurrentUser(prev => {
      return {
        ...prev,
        friend: payload,
      }
     });
     setLoadingAddFriend(false);
}

const setChat = async (user) => {
  SetIsHome(false);
  setCurrentChat(user);
  setNewMsgRelay(prev => {
    const copyPrev = { ...prev };
    copyPrev[user.id] = 0;
    return copyPrev;
  });
}

const addSetIsHome = () => {
  SetIsHome(true);
}

const setMessageData = async (msg) => {
  const id = new Date();
  setMessages(prev => [...prev, { ...msg, id }]);
  const res = await addChat(msg);
  setMessages(prev => {
    if (prev.id === id) {
      return res;
    }
    return prev;
  });
}

const searchUser = (name) => {
  setSearchVal(name);
}

async function removeMsg(msgData) {
  await deleteChat(msgData.id);
  // setMessages(prev => prev.filter(data => data.id !== msgData.id));
}

useEffect(() => {
  if (!accessToken) {
    navigate("/login");
  }
  
  if (accessToken && accessToken !== "no") {
    setCurrentUser(accessToken);
    setLoading(false);
  }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [accessToken]);

useEffect(() => {
  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);

useEffect(() => {
  const unsubscribe = onSnapshot(collection(db, 'users'), (snapshot) => {
    const usersData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
    console.log("==>users",usersData);
    setUsers(usersData);
  });

  return () => {
    if (unsubscribe) {
      unsubscribe()
    }
  }
}, []);

useEffect(() => {
  let unsubscribe = null;
  if (currentUser?.id) {
    unsubscribe = onSnapshot(query(collection(db, 'chats'), or((where('userId', '==', currentUser.id), where('userId', '==', currentUser.id)))), (snapshot) => {
      const chatsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      console.log("==>chatsData",chatsData);
      // const isDeleted = chatsData.length < messages.length;
      // if (isDeleted) {
      setMessages(chatsData);
      // } else {
        const oldMsgs = messages.map(msg => msg.id);
        const newMsgs = chatsData.filter(msg => !oldMsgs.includes(msg.id));
        // setMessages(chatsData);
  
        newMsgs.map(msg => {
          if (currentChat && currentChat.id !== msg.toId & currentChat.id !== msg.userId) {
            setNewMsgRelay(prev => {
              const copyPrev = { ...prev };
              if (copyPrev.hasOwnProperty(msg.toId)) {
                copyPrev[msg.toId] = copyPrev[msg.toId] + 1;
              } else {
                copyPrev[msg.toId] = 1;
              }
              return copyPrev;
            });
          }
        });
      // }
    });
  }

  return () => {
    if (unsubscribe) {
      unsubscribe();
    }
  }
}, [currentUser]);

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
      {currentUser?.id && (width > 1024 || isHome) && (
        <Chatusers 
          users={users} 
          setChat={setChat} 
          currentUser={currentUser}
          searchUser={searchUser}
          searchVal={searchVal}
          isSettings={isSettings}
          toggleSettings={toggleSettings}
          addCurrentSetting={addCurrentSetting}
          addSetIsHome={addSetIsHome}
          newMsgRelay={newMsgRelay}
        />
      )}
      {/* {loadingMsg && (<div style={{ margin: "0 auto" }}>
        <Loader />
      </div>)} */}
      {currentUser?.id && !isSettings && currentChat && (width > 1024 || !isHome) && (
        <Chatbox 
          currentUser={currentUser} 
          currentChat={currentChat} 
          addFriend={addFriend}
          loadingAddFriend={loadingAddFriend}
          width={width}
          addSetIsHome={addSetIsHome}
          loadingMsg={loadingMsg}
          messages={messages}
          setMessageData={setMessageData}
          removeMsg={removeMsg}
        />
      )}
      {isSettings && currentSetting === "Profile" && <Profile currentUser={currentUser}/>}
      {isSettings && currentSetting === "Privacy" && <Privacy currentUser={currentUser}/>}
    </Layout>
  )
}

export default App
