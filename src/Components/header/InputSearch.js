import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './InputSearch.module.css';


const InputSearch = props=>{

    const inputSearch= useRef();
    const [BooksNames , setBooksNames]=useState([])
    const [DataFiltered,setDataFiltered]=useState([])
    
    const clear = ()=>{
        inputSearch.current.value='';
        document.getElementById('clearSearchInput').style.display='none'
        setDataFiltered([])
    }
    
    useEffect(()=>{
        fetchingBooks()
    },[])

    async function fetchingBooks(){
        try{
            await fetch('https://gutendex.com/books/?page=1')
                .then(response=>{
                if(!response.ok){
                    throw new Error('not found')
                }
                return response.json()})
                .then(data=>{
                let result = data.results;
                    
                result = result.map(bookObj=> bookObj.title)
                setBooksNames(result)
            })
           
       }catch(error){
           return error.message
       }
    }
    const filtering =(e)=>{

        let data=[] , flag={};
       
        if(e.target.value){
            document.getElementById('clearSearchInput').style.display='inline'
            try{
                BooksNames.forEach((b,i)=>{
                    if(b.toLowerCase().includes(e.target.value.toLowerCase()))
                        !data.includes(b)&&data.push(b)
                    if(data.length>10){
                        throw flag;
                    }
                })
            }catch(e){
                if (e !== flag) throw e;
            }
            setDataFiltered(data)
        }else{
            document.getElementById('clearSearchInput').style.display='none'
            setDataFiltered([])
        }
    }
    
    
    return(
        <div className={styles.searchCont}>

            <input onChange={filtering} ref={inputSearch} className={styles.inputSearch} type="text" placeholder="Search.." />
            
            <span id='clearSearchInput' onClick={clear} className={styles.clear}>&#x2715;</span>
            
            <button className={styles.search} ><span>&#9906;</span></button>
            
            <div id='suggest' className={styles.suggest} >
                    {DataFiltered.map((name,i) => {
                        return <span key={Math.random()} onClick={clear}> 
                                    <Link to={'/books/'+name} >{name.substr(0,30)}</Link>
                                </span>
                    })}
                
            </div>
        </div>
    )
}

export default InputSearch;