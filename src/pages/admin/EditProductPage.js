import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { getProduct, editProduct } from '../../api/products'
import ProductForm from '../../components/admin/ProductForm';


const EditProductPage = () => {
  const history = useHistory()
  const { id } = useParams()
  const [form, setForm] = useState({})
  const [image, setImage] = useState({})
 
  const fetchDataProduct = async () => {
    const resProduct = await getProduct(id)
    setImage(resProduct.image)
    setForm(resProduct)
  }

  const handleSubmit = async e => {
    e.preventDefault(); 
    const resProduct = await editProduct(form);
    history.push("/admin/product/show/"+resProduct.id)
  }

  useEffect(() => {
    fetchDataProduct()
  }, [])

  return (
    <Container>
      <h1>Modifica {form.name}</h1>
      <ProductForm 
        handleSubmit={handleSubmit} 
        form={form} 
        setForm={setForm}
        image={image} 
        setImage={setImage}
        />
    </Container>
  )
  
}
export default EditProductPage
