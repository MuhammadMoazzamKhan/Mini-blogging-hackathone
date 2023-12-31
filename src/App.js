import './App.css';
import React, { useState,useEffect } from 'react'; // Don't forget to import React
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Use Router instead of Main
import { getAuth, onAuthStateChanged } from "firebase/auth";

import LoadingBar from 'react-top-loading-bar'

import Navbar from './components/Navbar';
import Registration from './components/Registration';
import Login from './components/Login';
import Home from './components/Home';
import DashBorad from './components/DashBorad';
import { getFirestore } from "firebase/firestore";
import { app } from "./FireBase"
import { collection, query, where, getDocs } from "firebase/firestore";
import Profile from './components/Profile';




function App() {
  const [currentUser, setcurrentUser] = useState([]);
  const [progress, setProgress] = useState(0)



  const auth = getAuth();
  // onAuthStateChanged(auth, async (user) => {
  //   if (user) {
  //     const uid = user.uid;
  //     console.log(user, 'current user')
  //     setUser(user)

  //     const db = getFirestore(app);
  //     const q = query(collection(db, "user"), where("uid", "==", uid));

  //     const querySnapshot = await getDocs(q);
  //     querySnapshot.forEach((doc) => {
  //       console.log(doc.id, " => ", doc.data());
  //       setcurrentUser(doc.data())
  //     });


  //   } else {
  //     setUser(null)
  //     console.log("User no")
  //   }
  // });

  

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async(user) => {
      if (user) {
            const uid = user.uid;
            console.log(user, 'current user')
      
            const db = getFirestore(app);
            const q = query(collection(db, "user"), where("uid", "==", uid));
      
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
              console.log(doc.id, " => ", doc.data());
              setcurrentUser(doc.data())
            });
      
      
          } else {
            console.log("User no")
            setcurrentUser('')
          }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);




  return (
    <Router> {/* Change Main to Router */}
      <>
        <Navbar user={currentUser ?  currentUser.userName : "Sign Up" } path={currentUser ? "/profile"  : "/signup"} bloger={currentUser ? "My blogs" : "Log in" } blogerPath={currentUser ? "./dashboard" : "./login"} />
        <LoadingBar
          height={3}
          color='#f11946'
          progress={progress}
        />
        <Routes>
          <Route exact path="/" element={<Home  setProgress={setProgress} />} />
          <Route exact path="/signup" element={<Registration  setProgress={setProgress} />} />
          <Route exact path="/login" element={<Login  setProgress={setProgress} />} />
          <Route exact path="/dashboard" element={<DashBorad  setProgress={setProgress} />} />
          <Route exact path="/profile" element={<Profile setProgress={setProgress} />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
