import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { useRef } from 'react';

function CustomCard() {

    const title = useRef()
    const detail = useRef()

    const PublishBlog = () => {
        const blogTitle = title.current.value;
        const blogContent = detail.current.value;
        // if (blogTitle && blogContent) {
        //     console.log(blogTitle, "---->", "value");
        //     console.log(blogContent, "---->", "value")
        //     let dataObje = { blogTitle, blogContent, }

            
        //     const db = getFirestore(app);
        //     const q = query(collection(db, "user"), where("uid", "==", uid));
      
        //     const querySnapshot = await getDocs(q);
        //     querySnapshot.forEach((doc) => {
        //       console.log(doc.id, " => ", doc.data());
        //       setcurrentUser(doc.data())
        //     });




        // }
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
    );
}

export default CustomCard;