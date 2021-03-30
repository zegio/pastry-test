import React from 'react'
import { Switch } from 'react-router-dom'
import Layout from './components/Layout'
import PrivateLayout from './components/PrivateLayout'
import OnlyPublicRoute from './routes/OnlyPublicRoute'
import PrivateRoute from './routes/PrivateRoute'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/admin/DashboardPage'
import ShowProductPage from './pages/admin/ShowProductPage'
import AddProductPage from './pages/admin/AddProductPage'
import EditProductPage from './pages/admin/EditProductPage'

const ApplicationRouter = () => {
  return (
    <Switch>
      <OnlyPublicRoute exact path='/' component={HomePage} layout={Layout} />
      <OnlyPublicRoute exact path='/products' component={ProductsPage} layout={Layout} />
      <OnlyPublicRoute exact path='/login' component={LoginPage} layout={Layout} />
      <PrivateRoute exact path='/admin/dashboard' component={DashboardPage} layout={PrivateLayout} />
      <PrivateRoute exact path='/admin/product/add' component={AddProductPage} layout={PrivateLayout} />
      <PrivateRoute path='/admin/product/show/:id?' component={ShowProductPage} layout={PrivateLayout} />
      <PrivateRoute path='/admin/product/edit/:id?' component={EditProductPage} layout={PrivateLayout} />
    </Switch>
  )
}

export default ApplicationRouter
