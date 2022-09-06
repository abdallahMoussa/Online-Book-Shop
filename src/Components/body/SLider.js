import Slide from './Slide';
import Slides from '../../Slides.json';
import { useEffect, useRef, useState } from 'react';

const Slider = props =>{

    const [count , setCount] = useState(0);

    useEffect(()=>{
        let itration = setTimeout(()=>{
            clearTimeout(itration)
            setCount((count+1)%Slides.length)
        },5000)
    },[count])

    return(
         <Slide slide={Slides[count]} />
    )
}
export default Slider ;