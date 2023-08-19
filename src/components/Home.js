import React, { useRef, useEffect, useState } from 'react';
import '../App.css'; // Import the CSS file for styling
// import BlogItem from './BlogItem'; // Import the CSS file for styling
import 'bootstrap/dist/css/bootstrap.min.css';
import { getFirestore, collection, query, where, onSnapshot } from "firebase/firestore";
import { app } from "../FireBase"
import { Card, Avatar } from 'antd';
import { Link } from 'react-router-dom';

const { Meta } = Card;

export default function Login() {

    const [blogs, setblogs] = useState([]);

    useEffect(() => {
        const db = getFirestore(app);
        const q = query(collection(db, "Blogs"));
        const Blogs = [];
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                Blogs.push(doc.data());
            });
            console.log(Blogs, 'Blogs')
            setblogs(Blogs)

        });

    }, [])


    return (
        <div className='container'>
            <h1 className="responsive-heading">Good Morning Readers!</h1>
            <h2 className="sub-heading">All Blogs</h2>

            <div style={{ marginTop: '2%' }}>
                {blogs?.map((blog, index) => {
                    console.log(blog, index, 'blog, indexblog, index')
                    return (
                        <div key={index} className="custom-card">
                            <div style={{ display: 'flex', flexDirection: 'row' }}>
                                <Avatar size={70} src={blog?.userDp} style={{}} />
                                <div style={{ marginLeft: 20 }}>
                                    <h3 style={{ marginTop: 5 }}>{blog.name}</h3>
                                    {/* <p>{blog?.Date}</p> */}
                                </div>
                            </div>
                            <div>
                                {blog?.blogContent}
                            </div>
                            <div style={{ marginTop: '1%' }}>
                                <Link>See all from this user</Link>
                            </div>
                        </div>

                    )
                }
                )}
            </div>








        </div>
    );
}
