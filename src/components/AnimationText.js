import { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import '../css/AnimationText.css'

const AnimationText = ({text}) => {
  const history = useHistory()
  const [animationClass, setAnimationClass] = useState('')
  
  const getSpans = (text) => {
    const spans = []
    let s = 0.00
    let style = {}
    for (let i=0; i<text.length; i++){
        let letter = text[i] 
        s += 0.025
        style = {
          animationDelay: s+"s"        };
        spans.push(<span key={i} className={"char char-"+i} style={style}>{letter}</span>)
    }

    return spans
  }

  const goToProducts = () => {
    history.push('/products')
  }

  useEffect(() => {   
    setAnimationClass('is-animated')
  },[])

  return (
    <div>      
        <div className={animationClass} onClick={goToProducts}>
          <div data-animate="slide-in">
            {getSpans(text)}
          </div>
        </div>
    </div>
  );
}

export default AnimationText;
