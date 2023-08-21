import React, { useRef, useState } from 'react'
import '../App.css';
import { Link } from "react-router-dom";
import { app } from "../FireBase"
import { getFirestore, collection, addDoc } from "firebase/firestore";
import Spinner from './Spinner';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";




export default function Registration(props) {



  const db = getFirestore(app);
  const [loading, setloading] = useState(false);
  const [err, setErr] = useState(false);
  const name = useRef();
  const email = useRef();
  const password = useRef();

  const getValue = async (e) => {
    props.setProgress(10)
    e.preventDefault();
    const nameValue = name.current.value;
    const emailValue = email.current.value;
    const passwordValue = password.current.value;
    props.setProgress(30)
    try {
      if (nameValue && emailValue && passwordValue) {
        setErr(false)
        setloading(true)
        const auth = getAuth(app);
        props.setProgress(50)
        createUserWithEmailAndPassword(auth, emailValue, passwordValue)
          .then(async (userCredential) => {
            const user = userCredential.user;
            // console.log(user,'useruseruseruseruser')
            props.setProgress(70)
            const docRef = await addDoc(collection(db, "user"), {
              name: nameValue,
              email: emailValue,
              password: passwordValue,
              uid: user.uid,
            });
            // await console.log("Document written with ID: ", docRef.id);
            // console.log(user)
            props.setProgress(100)

            window.location = "/dashboard"
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // console.log("errorcode --->", errorCode)
            // console.log("messageerr-->",errorMessage)
          });

        // name.current.value = "";
        // email.current.value = "";
        // password.current.value = "";
        setloading(false)
      } else {
        setErr(true)
      }
    } catch (err) {
      // console.log(err)
    }
  }

  return (
    <div>
      <div className="formContainer">
        {props.setProgress(10)}
        <div className="formWrapper">
          <span className="logo">MK talk</span>
          <span className="rigister">Register</span>
          {err ? <span className="rigister" id="err">Fill given input.</span> : ""}
          {props.setProgress(30)}
          <form>
            <input type="text" placeholder="Display name..." id="name" ref={name} />
            <input type="email" placeholder="Email" id="emailSign" ref={email} />
            {props.setProgress(70)}
            <input type="password" placeholder="Password" id="passwordSign" autoComplete="on" ref={password} />
            <button className="button" id="btnSign" type="button" onClick={getValue}>{loading ? <Spinner /> : "Sign Up"}</button>
          </form>
          <p id="labelP">Do you have an account? <span id="login-btn"><Link to="/login">Login</Link></span></p>
        </div>
      </div>
      {props.setProgress(100)}
    </div>
  )
}
