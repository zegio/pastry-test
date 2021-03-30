import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Col, Container, Row } from 'react-bootstrap'
import { getProduct } from '../../api/products'
import Moment from 'react-moment';


const ShowProductPage = () => {
  const { id } = useParams()
  const [product, setProduct] = useState({});
  const [image, setImage] = useState({});

  const fetchDataProduct = async () => {
    const resProduct = await getProduct(id)
    setImage(resProduct.image)
    setProduct(resProduct)
  }

  useEffect( () => {
    fetchDataProduct()
  }, [])

  return (
    <Container>
      <Row>
        <Link className="btn-action" to={"/admin/product/edit/"+product.id}>Modifica</Link>
      </Row>
      <Row>
        <Col>
          <strong>Data:</strong>
          <span><Moment format="YYYY/MM/DD">{product.insertDate}</Moment></span>
        </Col>
        <Col>
          <strong>Nome:</strong>
          <span>{product.name}</span>
        </Col>
        <Col>
          <strong>Prezzo:</strong>
          <span>{product.price}{product.currency}</span>
        </Col>
      </Row>
      <Row>
        <Col>
          <strong>Ingredienti:</strong>
          <ul>
          { (product.ingredients && product.ingredients.length > 0) ?
            product.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            )) : ''
          }
          </ul>
        </Col>
      </Row>
      <Row>
        <Col>
          <img style={{width: '400px'}} src={image.base64} />
      </Col>
      </Row>
    </Container>
  )
  
}

export default ShowProductPage
