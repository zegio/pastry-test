import axios from 'axios'

const controlExpired = async () => {
  return await axios.get('http://localhost:8080/control-expireds').then(res => {
    return res
  })
}

export const getProducts = async () => {
  await controlExpired()
  return await axios.get('http://localhost:8080/products').then(res => {
    return res.data
  })
}

export const getProduct = async (id) => {
  await controlExpired()
  return await axios.get(`http://localhost:8080/product/${id}`).then(res => {
    return res.data
  })
}

export const addProduct = async (data) => {
  return await axios.post('http://localhost:8080/product', data).then(res => {
    return res.data
  })
}

export const editProduct = async (data) => {
  await controlExpired()
  return await axios.put('http://localhost:8080/product', data).then(res => {
    return res.data
  })
}

export const deleteProduct = async (id) => {
  return await axios.delete(`http://localhost:8080/product/${id}`).then(res => {
    return res.data
  })
}