import { db } from "../firebaseConfig";
import { addDoc, doc, collection, onSnapshot, getDocs, updateDoc, query, where, getDoc, setDoc, deleteDoc, runTransaction } from "firebase/firestore";
// import { toast } from "react-toastify";


// let userRef = collection(firestore, "users");
// let chatRef = collection(firestore, "chats");

// const collections = {
//     users: 
// }

// export const post = (collectionNameData, objectData) => {
//     const collectionName = collections[collectionNameData];
//     addDoc(collectionName, objectData).then(() => "added").catch ((err) => {console.log(err);return err;})
// }


// export const getStatus = (setAllStatuses) => {
//   onSnapshot(postref, (response) => {
//    setAllStatuses(response.docs.map((docs) => {
//      return {...docs.data(), id: docs.id}
//     }));
//   })
// }

// export const getSingleStatus = (setAllStatuses, id) => {
//   const singlePostQuery = query(postref, where("userId","==",id));
//   onSnapshot(singlePostQuery, (response) =>{
//     setAllStatuses(
//       response.docs.map((docs) => {
//         return {...docs.data(), id:docs.id}
//       })
//     );
//   });

// };
// export const getSingleUser = async (setUser, id) => {
//   const userRefById = doc(userRef, id);
//   const singleUserQuery = await getDoc(userRefById);
//   setUser(singleUserQuery.data());
// };

// export const postUserData = (object) => {
//   addDoc(userRef, object)
//     .then(() => {})
//     .catch((err) => {
//       console.log(err);
//     });
// };

// export const getCurrentUser = (setCurrentUser) => {
//   let currEmail = localStorage.getItem("userEmail");
//   console.log("local storage currEmail:", currEmail);
//   onSnapshot(userRef, (response) => {
//     setCurrentUser(
//       response.docs
//         .map((docs) => {
//           return { ...docs.data(), id: docs.id };
//         })
//         .filter((item) => {
//           return item.email === currEmail;
//         })[0]
//     );
//   });
// };


// export const editProfile = (id, payLoad) => {
//   let userToEdit = doc(userRef,id)

//   updateDoc(userToEdit, payLoad)
//   .then(() => {
//     toast.success('Profile has been updated successfuly')
//   })
//   .catch((err) => {
//     console.log(err);
//   });
// }


// export const likePost = (userId, postId, liked) => {

//   try {
//     let docToLike = doc(likeRef,`${userId}_${postId}`)
// if(liked){
//   deleteDoc(docToLike);
// }
// else {
//   setDoc(docToLike, {userId, postId});
// }
  
//   }
//   catch(err) {
//   console.log(err)
//   }
  
// }


// export const getLikesByUser = ( userId, postId, setLiked, setLikesCount) => {
//   try {
//     let likeQuery = query(likeRef, where("postId", "==", postId))

//    onSnapshot(likeQuery, (response) => {
//     let likes = response.docs.map((doc) => doc.data());
//     let likesCount = likes?.length;

//     const isLiked = likes.some((Like) => Like.userId === userId);


//     setLikesCount(likesCount);
//     setLiked(isLiked);
//    });
//  }
//   catch(err) {
//   console.log(err)
//   }
// }


// export const postComment = (postId, comment, timestamp) =>{
//   try {
//    addDoc(commentRef,{
//     postId, comment, timestamp
//    })
//   }
//   catch(err) {
//   console.log(err)
//   }
// }


// export const getcomments = (postId, setComments) =>{
//   try{
//      let singlePostQuery = query(commentRef, where("postId", "==", postId))

//      onSnapshot(singlePostQuery, (response) => {
//       const comments = response.docs.map((doc) => {
//         return {
//           id: doc.id,
//           ...doc.data()
//         }
//       }) ;
//       setComments(comments)
//      })
//   }
//   catch(err) {
//    console.log(err)
//   }
// }

function getDataChanges(ref, onChangeData) {
    onSnapshot(ref, (snapshot) => {
      const data = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() }); // Add document ID and data
      });
      console.log("Updated data:", data);
      onChangeData(data);
      // Update your component state with the received data
    });
}

export const getRealTimeData = (type) => {
    const collectionRef = collection(db, type);
    return [getDataChanges, collectionRef];
}
  
//   getDataChanges(chatCollectionRef); // Listen to the entire collection
  // getDataChanges(myDocRef);  // Listen to a specific document

export const addChat = async (msg) => {
    try {
        // Add a new document with the specified data
        const docRef = await addDoc(collection(db, 'chats'), msg);
        console.log('Document written with ID: ', docRef.id);
        return docRef;
        // Reset the form or handle success
    } catch (error) {
        console.error('Error adding document: ', error);
        return "error";
        // Handle errors
    }
}

export const updateChat = async (docId, msg) => {
    try {
        const docRef = doc(db, 'chats', docId);
        await updateDoc(docRef, msg);
        console.log('Document updated successfully!');
        return "updated";
        // Reset the form or handle success
    } catch (error) {
        console.error('Error updating document: ', error);
        return "error";
        // Handle errors
    }
}

export const deleteChat = async (docId) => {
    try {
        const docRef = doc(db, 'chats', docId);
        await deleteDoc(docRef);
        console.log('Document deleted successfully!');
        return "deleted";
        // Reset the form or handle success
    } catch (error) {
        console.error('Error deleting document: ', error);
        return "error";
        // Handle errors
    }
}

export const getChats = async (userId) =>{
    try{
          // Query 1: Products with category "Electronics"
      const q1 = query(collection(db, 'chats'), where('userId', '==', userId));
      const querySnapshot1 = await getDocs(q1);
      const products1 = querySnapshot1.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

      // Query 2: Products with price less than $50
      const q2 = query(collection(db, 'chats'), where('toId', '==', userId));
      const querySnapshot2 = await getDocs(q2);
      const products2 = querySnapshot2.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

      // Combine results
      const combinedProducts = [...products1, ...products2];

        console.log("firestore DB chats===>", combinedProducts);
    }
    catch(err) {
     console.log(err);
    }
}


export const login = async (userData) => {
    const user = {
        uid: userData.uid,
        name: userData.displayName,
        email: userData.email,
        status: "Online",
        image: userData.photoURL,
        metadata: [Object.keys(userData.metadata).join("-"), Object.values(userData.metadata).join("-")],
        lastseen: new Date(),
        friend: [],
    }

    const userCollectionRef = collection(db, 'users');

    await runTransaction(db, async (transaction) => {
        const uniqueKeyRef = doc(userCollectionRef, userData.uid);
        const existingKey = await transaction.get(uniqueKeyRef);
  
        if (existingKey.exists()) {
          const userDoc = existingKey.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
          delete userDoc["uid"];
          return userDoc;
        } else {
          transaction.set(doc(userCollectionRef), user); // Use user's UID as document ID
          delete user["uid"];
          return user;
        }
    });


    // if (existingKey.exists()) {
    //     const q1 = query(collection(db, 'users'), where('uid', '==', user.uid));
    //     const querySnapshot1 = await getDocs(q1);
    //     const products1 = querySnapshot1.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    //     return products1[0];
    // } else {
    //     try {
    //         // Add a new document with the specified data
    //         const docRef = await addDoc(collection(db, 'users'), user);
    //         if (docRef) {
    //             console.log('Document written with ID: ', docRef.id);
    //             delete user["uid"];
    //             return { ...user, id: docRef.id };
    //         }
    //         // Reset the form or handle success
    //     } catch (error) {
    //         console.error('Error adding document: ', error);
    //         return "error";
    //         // Handle errors
    //     }
    // }
}

export const addUser = async (msg) => {
    try {
        // Add a new document with the specified data
        const docRef = await addDoc(collection(db, 'users'), msg);
        console.log('Document written with ID: ', docRef.id);
        return docRef.id;
        // Reset the form or handle success
    } catch (error) {
        console.error('Error adding document: ', error);
        return "error";
        // Handle errors
    }
}

export const updateUser = async (docId, msg) => {
    try {
        const docRef = doc(db, 'users', docId);
        await updateDoc(docRef, msg);
        console.log('Document updated successfully!');
        return "updated";
        // Reset the form or handle success
    } catch (error) {
        console.error('Error updating document: ', error);
        return "error";
        // Handle errors
    }
}

export const deleteUser = async (docId) => {
    try {
        const docRef = doc(db, 'users', docId);
        await deleteDoc(docRef);
        console.log('Document deleted successfully!');
        return "deleted";
        // Reset the form or handle success
    } catch (error) {
        console.error('Error deleting document: ', error);
        return "error";
        // Handle errors
    }
}

export const getUsers = async () =>{
    try{
          // Query 1: Products with category "Electronics"
      const q1 = query(collection(db, 'users'));
      const querySnapshot1 = await getDocs(q1);
      const products1 = querySnapshot1.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

      // Query 2: Products with price less than $50
    //   const q2 = query(collection(db, 'chats'), where('toId', '==', userId));
    //   const querySnapshot2 = await getDocs(q2);
    //   const products2 = querySnapshot2.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

      // Combine results
      const combinedProducts = products1;
      //[...products1, ...products2];

        console.log("firestore DB users===>", combinedProducts);
    }
    catch(err) {
     console.log(err);
    }
}