import { push, ref, set } from "firebase/database";
import { realdb } from "../firebaseConfig";

async function addChat(data) {
    const dataRef = ref(realdb, 'chats/');
    const newDocRef = push(dataRef); // Creates a new child node with a unique key
    await set(newDocRef, data)
        .then(() => {
        console.log('Data written successfully!');
        console.log('Document ID:', newDocRef.key); // Access the generated unique ID
    })
    .catch((error) => {
        console.error('Error writing data:', error);
    });
}

export { addChat };