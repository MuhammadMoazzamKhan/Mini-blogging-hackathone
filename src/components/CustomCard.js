import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { useRef, useState } from 'react';
import { getFirestore, collection, getDocs, query, where, onSnapshot, addDoc, doc, setDoc ,serverTimestamp} from "firebase/firestore";
import { app } from "../FireBase"
import { getAuth, onAuthStateChanged } from "firebase/auth";



const CustomCard = ({ setMyBlogs, MyBlogs }) => {
    const [currentUser, setcurrentUser] = useState(null);

    const title = useRef()
    const detail = useRef()

    const PublishBlog = async () => {
        const blogTitle = title.current.value;
        const blogContent = detail.current.value;


        const currentUserUID = getAuth().currentUser.uid;
        console.log(currentUserUID, 'currentUserUIDcurrentUserUIDcurrentUserUID')

        if (blogTitle && blogContent) {



            const db = getFirestore(app);
            const q = query(collection(db, "user"), where("uid", "==", currentUserUID));
            let user;
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
                user = doc.data()
            });
            setcurrentUser(user)



            console.log("---->", user);
            let dataObject = { blogTitle, blogContent, userName: user?.userName, userDp: user?.userDp, uid: user?.uid,timestamp:serverTimestamp()}

            console.log(dataObject, 'dataObjectdataObjectdataObjectdataObject')


            const docRef = await addDoc(collection(db, "Blogs"), dataObject);
            console.log("Document written with ID: ", docRef.id);
            dataObject.blogId = docRef.id;
            const updatedDocRef = await setDoc(doc(db, "Blogs", docRef.id), dataObject);

            window.location.reload()
            let MyBlogsClone= MyBlogs.slice(0)
            MyBlogsClone.push(dataObject)
            setMyBlogs(MyBlogsClone)
            //    console.log("Updated document written with ID: ", updatedDocRef.id);
        }
    }


    return (
        <div className="container"  >
        <div className="custom-card">
            <Form>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Placeholder" ref={title} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Example textarea</Form.Label>
                    <Form.Control as="textarea" placeholder="What is your mind" ref={detail} rows={3} />
                </Form.Group>
                <Button onClick={() => PublishBlog()} variant="secondary" >Publish blog</Button>{' '}
            </Form>
        </div>

    </div>
    )
}




export default CustomCard;