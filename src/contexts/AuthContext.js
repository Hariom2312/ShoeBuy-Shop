// import { createContext, useContext, useEffect, useState } from "react";
// import { auth, db } from "../utils/firebase";
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
//   onAuthStateChanged,
// } from "firebase/auth";
// import { collection, getDocs, query, where } from "firebase/firestore";

// // create context
// const AuthContext = createContext();

// const AuthContextProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [imageAsset, setImageAsset] = useState(null);
//   const [userName, setUserName] = useState("");
//   const [email, setEmail] = useState("");
//   const [number, setNumber] = useState("");
//   const [address, setAddress] = useState("");
//   const [docId, setDocId] = useState(null);
//   const [userId, setUserId] = useState(null);

//   const clearUserData = () => {
//     setImageAsset(null);
//     setUserName("");
//     setEmail("");
//     setNumber("");
//     setAddress("");
//   };

//   // signUp
//   const signUp = async (email, password) => {
//     clearUserData();
//     try {
//       return await createUserWithEmailAndPassword(auth, email, password);
//     } catch (error) {
//       console.error("Error signing up:", error);
//       throw error;
//     }
//   };

//   // login
//    const logIn = async (email, password) => {
//     clearUserData();
//     try {
//       return await signInWithEmailAndPassword(auth, email, password);
//     } catch (error) {
//       console.error("Error logging in:", error);
//       throw error;
//     }
//   };

//   // logOut
//   const logOut = async () => {
//     clearUserData();
//     try {
//       return await signOut(auth);
//     } catch (error) {
//       console.error("Error logging out:", error);
//       throw error;
//     }
//   };


//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       if (currentUser) {
//         setUser(currentUser);
//       } else {
//         setUser(null);
//       }
//     });

//     return unsubscribe;
//   }, []);


//   // const dbInstance = collection(db,'users');


//   // getting user profile
//   const fetchUserDetails = async () => {
//     if (user && user?.uid) {
//       const q = query(
//         collection(db, "userInfo"),
//         where("userId", "==", user?.uid)
//       );
//       const querySnapshot = await getDocs(q);

//       querySnapshot.docs.map((doc) => {
//         setDocId(doc.id);
//         const userData = doc.data();
//         if (userData) {
//           setUserId(userData.userId);
//           setUserName(userData.userName);
//           setImageAsset(userData.image);
//           setEmail(userData.email);
//           setNumber(userData.number);
//           setAddress(userData.address);
//         }
//         return doc;
//       });
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         signUp,
//         logIn,
//         logOut,
//         userName,
//         setUserName,
//         email,
//         setEmail,
//         number,
//         setNumber,
//         address,
//         setAddress,
//         imageAsset,
//         setImageAsset,
//         docId,
//         setDocId,
//         userId,
//         setUserId,
//         fetchUserDetails,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const UserAuth = () => {
//   return useContext(AuthContext);
// };

// export default AuthContextProvider;


import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";

// Create context
const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [docId, setDocId] = useState(null);
  const [userId, setUserId] = useState(null);

  const clearUserData = () => {
    setImageAsset(null);
    setUserName("");
    setEmail("");
    setNumber("");
    setAddress("");
  };

  // Sign up
  const signUp = async (email, password) => {
    clearUserData();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    }
  };

  // Log in
  const logIn = async (email, password) => {
    clearUserData();
    try {
       await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  };

  // Log out
  const logOut = async () => {
    clearUserData();
    try {
      return await signOut(auth);
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchUserDetails(currentUser.uid);
      } else {
        setUser(null);
      }
    });

    return unsubscribe;
  }, []);


  

  // Fetch user details
  const fetchUserDetails = async (uid) => {
   
    const ref = collection(db, "users");

    if (uid) {
      const q = query(ref, where("userId", "==", uid));
      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.docs.map((doc) => {
          setDocId(doc.id);
          const userData = doc.data();
          if (userData) {
            setUserId(userData.userId);
            setUserName(userData.userName);
            setImageAsset(userData.image);
            setEmail(userData.email);
            setNumber(userData.number);
            setAddress(userData.address);
          }
          return doc;
        });
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signUp,
        logIn,
        logOut,
        userName,
        setUserName,
        email,
        setEmail,
        number,
        setNumber,
        address,
        setAddress,
        imageAsset,
        setImageAsset,
        docId,
        setDocId,
        userId,
        setUserId,
        fetchUserDetails,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};

export default AuthContextProvider;
