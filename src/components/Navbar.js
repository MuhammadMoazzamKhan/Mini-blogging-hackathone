import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom"


export default function ButtonAppBar(props) {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
    <Container>
      <Navbar.Brand  href="#home">Personal Blogging App</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
        <Nav.Link as={Link} to="/">Home</Nav.Link>
        </Navbar.Text>
        <Navbar.Text>
        <Nav.Link as={Link} to={props.blogerPath}  style={{marginLeft:"20px"}} >{props.bloger}</Nav.Link>
        </Navbar.Text>
        <Navbar.Text>
        <Nav.Link as={Link} to={props.path} style={{marginLeft:"20px"}}>{props.user}</Nav.Link>
        </Navbar.Text>
      </Navbar.Collapse>
    </Container>
  </Navbar>
  );
}