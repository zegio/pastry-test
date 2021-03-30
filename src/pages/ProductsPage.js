import React, { useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import { getProducts } from '../api/products'
import ProductCards from '../components/ProductCards'


const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  const fetchDataProducts = async () => {
    const resProdutcs = await getProducts()
    setProducts(resProdutcs)
  }
  useEffect( () => {
    fetchDataProducts()
  }, [])

  return (
    <Container>
      <h1>Prodotti</h1>
      <Row className='mt-40' style={{marginBottom:'150px'}}>
        { (products.length>0) ?
            products.map(product => (
              <ProductCards key={product.id} product={product} />
            )) :
          <p>Non ci sono prodotti in vendita</p>
        }
      </Row>
    </Container>
  )
}
export default ProductsPage
