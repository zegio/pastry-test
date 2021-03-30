import React from 'react'
import AnimationText from '../components/AnimationText'
import imageHome from '../images/background-home.jpg'

const HomePage = () => {
  return (
    <div>
      <div className='title-contain'>
        <h1>Benvenuti nella</h1>
        <h1>Pasticceria di Luana e Maria</h1>
        <AnimationText text='Scopri i prodotti' />
      </div> 
      <div className='image-contain'>
        <img src={imageHome} />

      </div>
    </div>
  )
}
export default HomePage
