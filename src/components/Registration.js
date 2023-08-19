import React, { useRef, useState } from 'react'
import '../App.css';
import { Link } from "react-router-dom";
import { app } from "../FireBase"
import { getFirestore,collection, addDoc } from "firebase/firestore";
import Spinner from './Spinner';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";




export default function Registration() {



  const db = getFirestore(app);
  const [loading, setloading] = useState(false);
  const [err, setErr] = useState(false);
  const name = useRef();
  const email = useRef();
  const password = useRef();

  const getValue = async (e) => {
    e.preventDefault();
    const nameValue = name.current.value;
    const emailValue =  email.current.value;
    const passwordValue = password.current.value;
    try {
      if (nameValue && emailValue && passwordValue ) {
        setErr(false)
        setloading(true)
        const auth = getAuth(app);
        createUserWithEmailAndPassword(auth, emailValue, passwordValue)
          .then(async(userCredential) => {
            const user = userCredential.user;
            console.log(user,'useruseruseruseruser')
            const docRef = await addDoc(collection(db, "user"), {
              name: nameValue,
              email:emailValue,
              password: passwordValue,
              uid: user.uid,
            });
            await console.log("Document written with ID: ", docRef.id);
            console.log(user)

            window.location = "/dashboard"
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("errorcode --->", errorCode)
            console.log("messageerr-->",errorMessage)
          });

        // name.current.value = "";
        // email.current.value = "";
        // password.current.value = "";
        setloading(false)
      } else {
        setErr(true)
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <div className="formContainer">
        <div className="formWrapper">
          <span className="logo">MK talk</span>
          <span className="rigister">Register</span>
          {err ? <span className="rigister" id="err">Fill given input.</span> : ""}
          <form>
            <input type="text" placeholder="Display name..." id="name" ref={name} />
            <input type="email" placeholder="Email" id="emailSign" ref={email} />
            <input type="password" placeholder="Password" id="passwordSign" autoComplete="on" ref={password} />
            <button className="button" id="btnSign" type="button" onClick={getValue}>{loading ? <Spinner /> : "Sign Up"}</button>
          </form>
          <p id="labelP">Do you have an account? <span id="login-btn"><Link to="/login">Login</Link></span></p>
        </div>
      </div>
    </div>
  )
}
