import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Slider.module.css';

const Slide =(props)=>{

    let {slide} = props;
    const slideRef = useRef();
    useEffect(()=>{
        
        let show =setTimeout(()=>{
            clearTimeout(show)
            slideRef.current&&(slideRef.current.children[0].style.opacity=1)
            slideRef.current&&(slideRef.current.children[1].style.opacity=1)
        },1)
        let hide = setTimeout(()=>{
            clearTimeout(hide);
            slideRef.current&&(slideRef.current.children[0].style.opacity=0)
            slideRef.current&&(slideRef.current.children[1].style.opacity=0)
        },4300)
    })
    return(
         <div ref={slideRef} className={`${styles.slide} m-auto px-6 border h-72 mt-14 rounded-xl`}>
            <div  className={`${styles.details}  w-1/2 sm:w-full text-left px-4 py-14 overflow-hidden `}>
                    <h1 className='text-5xl font-bold '>{slide.title}</h1>
                    <h6 className='text-xl w-full pt-5 pb-10 text-slate-500'>{slide.desc}</h6>
                    <Link to="/books">
                        <button className='px-3 py-1 rounded-md text-bold text-white hover:opacity-90 duration-300 shadow-lg active:text-slate-800 active:bg-slate-600'>View all</button>
                    </Link>
            </div>
            <div className={`${styles.img} slid-image h-full w-1/2`}>
                <img src={slide.img} className="h-full"></img>
            </div>
        </div>
    )
}

export default Slide;