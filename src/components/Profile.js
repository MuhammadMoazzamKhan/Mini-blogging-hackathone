import React, { useRef, useState, useEffect } from 'react'
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaPaintBrush } from "react-icons/fa";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs, getFirestore, doc, updateDoc } from "firebase/firestore";
// import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "../FireBase"
import imageImp from "../images/Use.png"




export default function Profile() {
    const oldPassword = useRef();
    const name = useRef();
    const password = useRef();
    const repeatPassword = useRef();
    const [showPassword, setShowPassword] = useState("Password");
    const [currentUser, setcurrentUser] = useState([]);
    const [edit, setEdit] = useState(false)
    const [id, setid] = useState("")
    // const [data , setData] = useState();

    const auth = getAuth();
    const db = getFirestore(app);
    
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const uid = user.uid;
                console.log(user, 'current user')

                const q = query(collection(db, "user"), where("uid", "==", uid));

                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    console.log(doc.id, " => ", doc.data());
                    setcurrentUser(doc.data())
                    setid(doc.id)
                });
            } else {
                console.log("User no")
            }
        });

        return () => unsubscribe();
    }, []);

//     const uploadfile = async() => {
//         const storage = getStorage();
//     return new Promise((resolve, reject) => {
//         const storageRef = ref(storage, `images/${data[0].name}`);
//         const uploadTask = uploadBytesResumable(storageRef, URL.createObjectURL(data));
//         uploadTask.on('state_changed',
//             (snapshot) => {
//                 const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//                 console.log('Upload is ' + progress + '% done');
//                 switch (snapshot.state) {
//                     case 'paused':
//                         console.log('Upload is paused');
//                         break;
//                     case 'running':
//                         console.log('Upload is running');
//                         break;
//                 }
//             },
//             (error) => {
//                 reject(error)
//             },
//             () => {
//                 getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//                     resolve(downloadURL);
//                 });
//             }
//         );
//     })
// }

    const getPassword = async () => {
        if (oldPassword.current.value) {
            if (password.current.value === repeatPassword.current.value) {
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

    const editName = async() => {
        try{
            if (edit) {
                const userRef = doc(db, "user", id);
                await updateDoc(userRef, {
                    userName: name.current.value
                });
                setEdit(false)
        } else {
            setEdit(true)
        }
    }catch(err){
        console.log(err , "akldjaskl")
    }

    }


    // console.log(data ? console.log(URL.createObjectURL(data)):"")
    // const imageUrl = async()=>{
    //     uploadfile()
    // }
    // data && imageUrl()


    return (
        <div className='container' >
            <h2 style={{ margin: 25 }}>Profile</h2>
            <div className='custom-card'>

                <div className="image-container custom-card" style={{ backgroundImage: `url(${imageImp})` }}>
                <button className="overlay-button"><label htmlFor="files"><FaPaintBrush  className="App-logo" style={{ maxWidth: "20px", color: "purple" }} /></label></button>
                </div>



                {!edit ? <h5>{currentUser.userName} <FaPaintBrush className="App-logo cursor-pointer" style={{ maxWidth: "20px" }} onClick={editName} /></h5> : <Form.Control ref={name} type="email" placeholder="Repeat password" style={{ width: "50%", margin: "1% 0", display: "block" }} />}
                {edit ? <Button variant="outline-primary" className='btn' onClick={editName} >Update password</Button> : ""}

                <input type="file" id='files' onChange={(e)=>{
                        // setData(e.target.files[0])
                }} style={{display: "none"}} />

                <h5 style={{ margin: "2% 0" }}>{showPassword}</h5>
                <Form.Control type="email" placeholder="Old password" style={{ width: "50%", margin: "1% 0", display: "block" }} ref={oldPassword} />
                <Form.Control type="email" placeholder="New password" style={{ width: "50%", margin: "1% 0", display: "block" }} ref={password} />
                <Form.Control type="email" placeholder="Repeat password" style={{ width: "50%", margin: "1% 0", display: "block" }} ref={repeatPassword} />
                <Button variant="outline-primary" className='btn' onClick={getPassword} >Update password</Button>{' '}

            </div>


        </div>
    )
}
