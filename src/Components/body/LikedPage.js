import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "./Loader";


const LikedPage = props=>{
    
    const [LikedBooks , setLikedBooks] = useState([])
    const [Loaded , setLoaded] = useState(false)
    const [errorMes , setError] = ('')
    useEffect(()=>{
        getLiked()

    },[])

    async function getLiked(){
         try{
                const response = await fetch('https://react-backend-49bcf-default-rtdb.firebaseio.com/ReaderBooks.json',{
                    method: 'GET',
                    headers:{
                        'Content-Type':'application/json'
                    }
                })
                if(response.ok){
                    const books = await response.json();
                    let userId = localStorage.getItem('userId');
                    let tempLiked = []
                        
                    for(let key in books){
                        if(books[key]['userId']==userId){  
                            books[key]['RDL'].includes('L')&&(tempLiked= [...tempLiked , books[key]])
                        }
                    }
                    setLikedBooks(prev=>tempLiked)
                    setLoaded(true)
                }else{
                    throw Error('Faild to Load this Page')
                }
        }catch(error){
            alert(error.message)
        }
    }

    return(
        <div className="w-full duration-1000 pt-10 flex flex-wrap">
           
        {Loaded? LikedBooks.map((b,i)=> <div key={i} className="item font-serif pl-10 flex my-5 w-4/12">

                                <span alt="Like" className='text-4xl w-10 text-purple-900  left-0 '>&#10084;</span>
                                <Link to={'/books/'+b.LikedBookTitle}>
                                    <span title="open book page" className="text-purple-900 pl-5 mt-2 block hover:text-purple-500">{b.bookTitle.split(' ')[0] +' '+ b.bookTitle.split(' ')[1]}</span>
                                </Link>
                                
                            </div>):
            <Loader />
           }
        </div>
    )
}

export default LikedPage;