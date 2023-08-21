import React, { useRef } from 'react'
import { Link } from "react-router-dom"
import { app } from '../FireBase'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";



export default function Login(props) {
    const inputRef = useRef(null)
    const inputPassword = useRef(null);

    const login = () => {
        props.setProgress(10)
        const email = inputRef.current.value;
        const password = inputPassword.current.value;
        props.setProgress(30)
        if (email && password) {
            props.setProgress(50)
            const auth = getAuth(app);
            signInWithEmailAndPassword(auth, email, password)
                .then(async (userCredential) => {
                    props.setProgress(100)

                    const user = await userCredential.user;
                    // console.log("user-->",user)
                    window.location = "/"
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                });
        } else {
        props.setProgress(0)
        }
    }

    return (
        <div>
            {props.setProgress(10)}
            <div className="formContainer">
                <div className="formWrapper">
                    <span className="logo">MK talk</span>
                    <span className="rigister">Sign In</span>
                    {props.setProgress(30)}
                    <form>
                        <input type="email" placeholder="Email" id="emailLog" ref={inputRef} />
                        <input type="password" placeholder="Password" id="passwordLog" autoComplete="on" ref={inputPassword} />
                        {props.setProgress(70)}
                        <button className="button" id="btnLog" type="button" onClick={login}>Sign In</button>
                    </form>
                    <p id="labelP">Don't you have an account? <span id="Register-btn"><Link to="/signup">Register</Link></span></p>
                </div>
            </div>
            {props.setProgress(100)}
        </div>
    )
}
