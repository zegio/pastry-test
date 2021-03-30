import { useEffect, useState } from 'react'
import '../css/Cake.css'

const Cake = () => {
  const [animationClass, setAnimationClass] = useState('')

  useEffect(() => {   
    setAnimationClass('is-animated-cake')
  },[])

  return (
    <div className={"box-canvas "+animationClass}>
      <div className="cake-side"></div>
      <div className="drips">
        <div className="drip"></div>
        <div className="drip"></div>
        <div className="drip"></div>
        <div className="drip"></div>
        <div className="drip"></div>
        <div className="drip"></div>
        <div className="drip"></div>
        <div className="drip"></div>
        <div className="drip"></div>
        <div className="drip"></div>
        <div className="drip"></div>
      </div>
      <div className="cake-top"></div>
    </div>
  );
}

export default Cake;
