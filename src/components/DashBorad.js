import React, { useState, useEffect } from 'react'
import CustomCard from './CustomCard'
import { getFirestore, collection, getDocs, query, where, onSnapshot, serverTimestamp } from "firebase/firestore";
import { app } from "../FireBase"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Card, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import moment from "moment";

export default function DashBorad(props) {
    const [MyBlogs, setMyBlogs] = useState([]);
    const auth = getAuth();

    // useEffect(async () => {
    // 
    // console.log(auth, 'sssscsccscs')
    // const db = getFirestore(app);
    //     const q = query(collection(db, "Blogs"), where("uid", "==", uid));
    //     const querySnapshot = await getDocs(q);
    //     querySnapshot.forEach((doc) => {
    //       console.log(doc.id, " => ", doc.data());
    //       setMyBlogs(doc.data())
    //     });


    // }, [])

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                props.setProgress(10)
                // console.log(user, 'useruseruseruseruseruseruseruseruseruseruseruseruser')
                const db = getFirestore(app);
                const q = query(collection(db, "Blogs"), where("uid", "==", user.uid));
                props.setProgress(30)

                const querySnapshot = await getDocs(q);
                props.setProgress(70)

                const Blogs = [];

                querySnapshot.forEach((doc) => {
                    Blogs.push(doc.data());
                });
                // console.log(Blogs, "setMyBlogssetMyBlogssetMyBlogssetMyBlogs",);

                setMyBlogs(Blogs)
                props.setProgress(100)

            } else {
                // setUser(null)
                // // console.log("User no")
            }
        });

        // Clean up the listener when the component unmounts
        return () => unsubscribe();
    }, []);

    const deleteMyblog = (() => {
        alert()
    })


    return (
        <div>
            <div className="container" style={{ marginTop: '2%', marginBottom: '2%' }}>
                <h1>DashBoard</h1>
            </div>
            <div style={{ display: "flex", justifyContent: 'flex-start', alignItems: "flex-start" }}>
                <CustomCard />
            </div>
            <div className="container" style={{}}>
                <h3>My blogs</h3>
            </div>
            <div className='container'>
                {MyBlogs.length > 0 && MyBlogs.map((blog, index) => {
                    // console.log(blog, index, 'blog, indexblog, index')
                    return (
                        <div key={index} className="custom-card">
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <Avatar size={70} src={blog?.userDp} style={{}} />
                                <div style={{ marginLeft: 20 }}>
                                    <h3 style={{ marginTop: 5 }}>{blog.blogTitle}</h3>
                                    <p>{moment(blog.timestamp.toDate()).fromNow()}</p>
                                    {/* console.log(blog.timeS) */}
                                    <p>{blog?.userName}</p>
                                </div>
                            </div>
                            <div>
                                {blog?.blogContent}
                            </div>
                            <div style={{ marginTop: '1%' }}>
                                <Link onClick={() => deleteMyblog()} >Delete</Link>
                            </div>
                        </div>

                    )
                })}
            </div>





        </div>
    )
}
