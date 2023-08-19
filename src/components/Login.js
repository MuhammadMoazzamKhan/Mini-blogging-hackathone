import React, { useRef } from 'react'
import { Link } from "react-router-dom"
import { app } from '../FireBase'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";



export default function Login() {
    const inputRef = useRef(null)
    const inputPassword = useRef(null);

    const login = () => {
        const email = inputRef.current.value;
        const password = inputPassword.current.value;
        if (email && password) {
            const auth = getAuth(app);
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {

                    const user = userCredential.user;
                    console.log("user-->",user)

                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                });
        } else {

        }
    }

    return (
        <div>
            <div className="formContainer">
                <div className="formWrapper">
                    <span className="logo">MK talk</span>
                    <span className="rigister">Sign In</span>
                    <form>
                        <input type="email" placeholder="Email" id="emailLog" ref={inputRef}/>
                        <input type="password" placeholder="Password" id="passwordLog" autoComplete="on" ref={inputPassword} />
                        <button className="button" id="btnLog" type="button" onClick={login}>Sign In</button>
                    </form>
                    <p id="labelP">Don't you have an account? <span id="Register-btn"><Link to="/signup">Register</Link></span></p>
                </div>
            </div>
        </div>
    )
}
