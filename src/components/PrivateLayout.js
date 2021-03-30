import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { Navbar, Nav } from 'react-bootstrap';
import { useHistory } from 'react-router-dom'

const PrivateLayout = ({ children, getToken }) => {
  const history = useHistory()

  const removeToken = () => {
    localStorage.removeItem('token');
    history.push('/login');
  }

  const logout = (getToken) ? <Nav.Link onClick={removeToken}>Logout</Nav.Link> : ''
   
  return (
    <div>
      <Navbar collapseOnSelect expand="lg">
        <Navbar.Brand href="/">Torna al Sito</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto"></Nav>
          <Nav>
            <Nav.Link href="/admin/dashboard">Dashboard</Nav.Link>
            <Nav.Link href="/admin/product/add">Aggiungi</Nav.Link>
            {logout} 
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {children}
      <div style={{
        height: '20px',
        width: '100%',
        marginBottom: '20px',
        marginTop: '20px'
      }} />
    </div>
  );
}

export default PrivateLayout;
