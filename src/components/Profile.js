import React, { useRef, useState, useEffect } from 'react'
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaPaintBrush, FaCloudUploadAlt } from "react-icons/fa";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getAuth, onAuthStateChanged, signOut, updatePassword } from "firebase/auth";
import { collection, query, where, getDocs, getFirestore, doc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "../FireBase"
import imageImp from "../images/Use.png"




export default function Profile(props) {
    const oldPassword = useRef();
    const name = useRef();
    const password = useRef();
    const repeatPassword = useRef();
    const [showPassword, setShowPassword] = useState("Password");
    const [getOldPAss, setGetOldPAss] = useState();
    const [currentUserHere, setcurrentUser] = useState([]);
    const [edit, setEdit] = useState(false)
    const [editIcon, setEditIcon] = useState(false)
    const [id, setid] = useState("")
    const [imageUpload, setImageUpload] = useState();
    // const [getUser, setgetUser] = useState();
    let imageGet;
    const auth = getAuth();
    const db = getFirestore(app);

    useEffect(() => {
        props.setProgress(10)
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                props.setProgress(40)

                const uid = user.uid;
                // console.log(user, 'current user')

                const q = query(collection(db, "user"), where("uid", "==", uid));
                props.setProgress(70)
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    // console.log(doc.id, " => ", doc.data());
                    setcurrentUser(doc.data())
                    setid(doc.id)
                    setGetOldPAss(doc.data().password)
                    // setgetUser(user.auth.currentUser)
                });
                props.setProgress(100)
            } else {
                // console.log("User no")
            }
        });

        return () => unsubscribe();
    }, []);

    const uploadfile = async () => {
        const storage = getStorage();
        return new Promise((resolve, reject) => {
            const storageRef = ref(storage, `images/${imageUpload.name}}`);
            const uploadTask = uploadBytesResumable(storageRef, imageUpload);
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => {
                    reject(error)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL);
                        imageGet ? setImageUpload() : setImageUpload(imageUpload)
                    });
                }
            );
        })
    }
    const fetchImage = async () => {
        imageGet = await uploadfile()
        // console.log(imageGet)
        try {
            if (editIcon) {
                const userRef = doc(db, "user", id);
                await updateDoc(userRef, {
                    userDp: imageGet
                });
                setEditIcon(false)
            } else {
                setEditIcon(true)
            }
        } catch (err) {
            // console.log(err, "akldjaskl")
        }

    }


    const getPassword = async () => {
        if (oldPassword.current.value === getOldPAss) {
            if (password.current.value === repeatPassword.current.value) {
                const auth = getAuth();
                const user = auth.currentUser;
                const newPassword = password.current.value + password.current.value;
                updatePassword(user, newPassword).then(async () => {
                    // Update successful.
                    // console.log("// Update successful.")
                    try {
                        const userRef = doc(db, "user", id);
                        await updateDoc(userRef, {
                            password: newPassword
                        });
                    } catch (err) {
                        // console.log(err, "PasswordPasswordPasswordPassword")
                    }
                }).catch((error) => {
                    // console.log("// An error ocurred", error)
                    // An error ocurred
                    // ...
                });
                setShowPassword("Your password has changed successfully.")
                oldPassword.current.value = ""
                password.current.value = ""
                repeatPassword.current.value = ''
            } else {
                setShowPassword("Password is not match.")
            }
        } else {
            setShowPassword("Enter your old password.")
        }
    }

    const editName = async () => {
        try {
            if (edit) {
                const userRef = doc(db, "user", id);
                await updateDoc(userRef, {
                    userName: name.current.value
                });
                setEdit(false)
            } else {
                setEdit(true)
            }
        } catch (err) {
            // console.log(err, "akldjaskl")
        }

    }
    const logout = () => {
        const auth = getAuth();
        signOut(auth).then(() => {
            // Sign-out successful.
        }).catch((error) => {
            // An error happened.
        });
    }


    return (
        <div className='container' >
            <h2 style={{ margin: 25 }}>Profile</h2>
            <div className='custom-card'>

                <div className="image-container custom-card" style={{ backgroundImage: `url(${currentUserHere.userDp ? currentUserHere.userDp : imageImp})` }}>
                    <button className="overlay-button cursor-pointer">{!imageUpload ? <label htmlFor="files"><FaPaintBrush className="App-logo cursor-pointer" style={{ maxWidth: "20px", color: "purple" }} /></label> : <FaCloudUploadAlt onClick={fetchImage} className="App-logo cursor-pointer" style={{ maxWidth: "20px", color: "purple" }} />}</button>
                </div>



                {!edit ? <h5>{currentUserHere.userName} <FaPaintBrush className="App-logo cursor-pointer" style={{ maxWidth: "20px" }} onClick={editName} /></h5> : <Form.Control ref={name} type="email" placeholder="Repeat password" style={{ width: "50%", margin: "1% 0", display: "block" }} />}
                {edit ? <Button variant="outline-primary" className='btn' onClick={editName} >Update password</Button> : ""}

                <input type="file" id='files' onChange={(e) => {
                    setImageUpload(e.target.files[0])
                    setEditIcon(true)
                }} style={{ display: "none" }} />

                <h5 style={{ margin: "2% 0" }}>{showPassword}</h5>
                <Form.Control type="email" placeholder="Old password" style={{ width: "50%", margin: "1% 0", display: "block" }} ref={oldPassword} />
                <Form.Control type="email" placeholder="New password" style={{ width: "50%", margin: "1% 0", display: "block" }} ref={password} />
                <Form.Control type="email" placeholder="Repeat password" style={{ width: "50%", margin: "1% 0", display: "block" }} ref={repeatPassword} />
                <div>
                    <Button variant="outline-primary" className='btn' onClick={getPassword} >Update password</Button>{' '}
                    <Button variant="outline-danger" className='btn' onClick={logout} >Logout</Button>{' '}
                </div>

            </div>


        </div>
    )
}
