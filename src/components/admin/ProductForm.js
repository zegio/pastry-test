import React, { useState } from 'react'
import { Form, Button, Col} from 'react-bootstrap';
import FileBase64 from 'react-file-base64';

const ProductForm = ( { handleSubmit, form, setForm, image, setImage } ) => {
  const [errors, setErrors] = useState({})
  
  const setFile = (file) => {
    setImage(file)
    setForm({
      ...form,
      ["image"]: file
    })
  }

  const isEmptyImage = (obj) => {
    for(var prop in obj) {
      if(obj.hasOwnProperty(prop)) {
        return false;
      }
    }
    return JSON.stringify(obj) === JSON.stringify({});
  }

  const validateForm = (form) => {
    
    //validate handle react / react hook / yup / ..
    for (const [key, value] of Object.entries(form)) {
      if(!value && key !== 'price'){
        setErrors({ [key]: "required*"})
        return false
      } 
    }
    // lodash _.isEmpty({});
    if(isEmptyImage(form.image)){
      setErrors({ ['image']: "required*"})
      return false 
    }

    return true
  }

  const handleChange = (target) => {
    setForm({
      ...form,
      [target.name]: target.value
    })
  }

  const handleChangeIngredients = (target) => {
    (target.value) ? 
      form.ingredients[target.name] = target.value 
    : delete form.ingredients[target.name];  
    setForm({
      ...form,
      ['ingredients']: form.ingredients
    })
  }

  const addIngredient = () => {
    form.ingredients.push('')
    setForm({
      ...form,
      ['ingredients']: form.ingredients
    })
  }

  const submitForm = e => {
    e.preventDefault();

    //clean empty ingredients    
    form.ingredients = form.ingredients.filter((ingredient) => {
      return ingredient !== ''
    })
    
    if(validateForm(form)){
      handleSubmit(e, {...form})
    }
  }

  return(
    <Form style={{marginTop: '50px'}}>
      <Form.Row>
        <Form.Group as={Col} md={4} xs={12} controlId="GridName">
          <Form.Label>Nome*</Form.Label>
          <Form.Control placeholder="Nome" name="name" value={form.name} onChange={e => handleChange(e.target)} />
          <p>{errors.name}</p>
        </Form.Group>

        <Form.Group as={Col} md={4} xs={12} controlId="GridPrice">
        <Form.Label>Prezzo Iniziale*</Form.Label>
          <Form.Control type='number' placeholder="Prezzo" name="initialPrice" value={form.initialPrice} onChange={e => handleChange(e.target)} />
          <p>{errors.initialPrice}</p>
        </Form.Group>

        <Form.Group as={Col} md={4} xs={12} controlId="GridState">
          <Form.Label>Valuta*</Form.Label>
          <Form.Control as="select" name='currency' value={form.currency} onChange={e => handleChange(e.target)}>
            <option></option>
            <option>€</option>
            <option>$</option>
            <option>£</option>
          </Form.Control>
          <p>{errors.currency}</p>
        </Form.Group>
      </Form.Row>

      <Form.Group as={Col} md={4} xs={12} controlId="GridIngredients">
      <Form.Label>Ingredienti</Form.Label>
        { (form.ingredients && form.ingredients.length > 0) ?
          form.ingredients.map((ingredient, index) => (
            <Form.Control key={index} style={{marginBottom: '15px'}} placeholder="Ingrediente" name={index} value={ingredient} onChange={e => handleChangeIngredients(e.target)} />
          )) : <br />
        }
        <Button variant="primary" type="button" onClick={() => addIngredient()}>Aggiungi</Button>
      </Form.Group>

      <Form.Row>
        <Form.Group as={Col} controlId="Image">
          <Form.Label>Immagine*</Form.Label>
          <br />
          <FileBase64
            onDone={ setFile.bind(this) } />
          <p>{errors.image}</p>
        </Form.Group>
        <Form.Group as={Col}>
          <img style={{width: '300px'}} src={image.base64} />
        </Form.Group>
      </Form.Row>

      <Button variant="primary" type="button" onClick={submitForm}>
        Salva
      </Button>
    </Form>  
    )

}

export default ProductForm
