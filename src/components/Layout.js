import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { Navbar, Nav } from 'react-bootstrap';
import Cake from './Cake';

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar collapseOnSelect expand="lg">
        <Navbar.Brand href="/"><Cake /></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto"></Nav>
          <Nav>
            <Nav.Link href="/products">Prodotti</Nav.Link>
            <Nav.Link href="/admin/dashboard">Admin</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {children}
    </div>
  );
}

export default Layout;
