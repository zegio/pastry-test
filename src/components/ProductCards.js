import { Col } from "react-bootstrap";
import '../css/ProductCard.css'

const ProductCards = ({product}) => {

  return (
    <Col lg={6} xs={12} >
        <div 
          className='contain-card-image'
          style={{backgroundImage: "url('"+product.image.base64+"')"}}
          >
          <div className='contain-card-name'>{product.name}</div>
          {(product.ingredients.length > 0) ?
            <div className='container-card-ingredients'>
              <strong>Ingredienti:</strong>
              <ul>
              { 
                product.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                )) 
              }
              </ul>
            </div>
            : ''
          }
          <div className="contain-card-price" style={{backgroundColor: (product.price == product.initialPrice) ? '#92bd92' : '#bd9292' }}>{product.price}{product.currency}</div>
        </div>
      
    </Col>
    
  );
}

export default ProductCards;
