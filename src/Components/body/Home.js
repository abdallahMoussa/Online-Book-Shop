import { useEffect, useState } from 'react';
import Loader from './Loader';
import Section from './Section'

const Home= props=>{
    
    const [Books , setBooks] = useState([]);
    const [Loaded , setLoaded] = useState(false);
    var PopularBooks = Books.slice(0,9)
    var FictionBooks = Books.slice(10,19)
    var LoveBooks = Books.slice(20,30)
    useEffect(()=>{
        try{
            fetch('https://gutendex.com/books/?page=1')
            .then(response=>{
               if(!response.ok){
                   throw new Error('not found')
               }
               return response.json()})
            .then(data=>{
               let books = data.results ;
               setBooks(prev=>books);
               setLoaded(true);
           })
           
       }catch(error){
           console.log(error.message)
       }
    },[])

   
    
    return(
        <>
         {Loaded?<>
                <Section name="Popular" books={PopularBooks} />
                <Section name="Fiction" books={FictionBooks} />
                <Section name="Love" books={LoveBooks} />
            </>:<Loader />
         }
       </>
    )
}

export default Home;