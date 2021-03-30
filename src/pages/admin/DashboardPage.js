import React, { useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import { getProducts, deleteProduct } from '../../api/products'
import TableList from '../../components/admin/TableList'

const DashboardPage = () => {
  const [products, setProducts] = useState([]);

  const fetchDataProducts = async () => {
    const resProdutcs = await getProducts()
    setProducts(resProdutcs)
  }

  const removeProduct = async (id) => {
    await deleteProduct(id)
    window.location.reload()
  }

  useEffect( () => {
    fetchDataProducts()
  }, [])

  return (
    <Container>
      <h1>Lista Prodotti</h1>
      <Row className='mt-40'>
        <TableList products={products} removeProduct={removeProduct} />
      </Row>
    </Container>
  )
  
}
export default DashboardPage
