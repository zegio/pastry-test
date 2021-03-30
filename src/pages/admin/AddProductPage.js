import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import { useHistory } from 'react-router';
import { addProduct } from '../../api/products'
import ProductForm from '../../components/admin/ProductForm';

const AddProductPage = () => {
  const history = useHistory()
  const [image, setImage] = useState({})
  const [form, setForm] = useState({
    name: '',
    initialPrice: '',
    currency: '',
    ingredients: [],
    image: {}
  });

  const handleSubmit = async e => {
    e.preventDefault();
    const resProduct = await addProduct(form);
    history.push("/admin/product/show/"+resProduct.id)
  }

  return (
    <Container>
      <h1>Aggiungi prodotto</h1>
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


export default AddProductPage
