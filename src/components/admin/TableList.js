import { Image, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Moment from 'react-moment';


const TableList = ({ products, removeProduct }) => {

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th></th>
          <th>Data di creazione</th>
          <th>Nome</th>
          <th>Prezzo Iniziale</th>
          <th>Prezzo di vendita</th>
          <th>Azioni</th>
        </tr>
      </thead>
      <tbody>
        { 
          products.map(product => (
            <tr key={product.id}>
              <td><Image src={product.image.base64} style={{ height: "80px" }} /></td>
              <td><Moment format="YYYY/MM/DD">{product.insertDate}</Moment></td>
              <td>{product.name}</td>
              <td>{product.initialPrice}{product.currency}</td>
              <td>{product.price}{product.currency}</td>
              <td>
                <Link className="btn-action" to={"/admin/product/show/"+product.id}>👁️</Link> 
                <Link className="btn-action" to={"/admin/product/edit/"+product.id}>✏️</Link>
                <span className="btn-action" onClick={() => {if(window.confirm('Vuoi rimuovere il prodotto?')){removeProduct(product.id)}}}>🗑</span>  
              </td>
            </tr>
          )) 
        }
      </tbody>
    </Table>
    
  );
}

export default TableList;
