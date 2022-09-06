import { useEffect, useRef, useState } from 'react';
import Book from './Book';
import Loader from './Loader';
import Pagination from './Pagination';

const Content = props=>{

    const [Books ,setBooks] = useState([]);
    const booksCont = useRef();
    const [Page , setPage] = useState(1);
    const [loaded , setloaded] =useState(false);

    useEffect(()=>{
      GetBooks(Page)
    },[Page])

    async function GetBooks(pageNum){
        try{
             fetch('https://gutendex.com/books/?page='+pageNum)
             .then(response=>{
                if(!response.ok){
                    throw new Error('not found')
                }
                return response.json()})
             .then(data=>{
                setBooks(data.results)
                setloaded(true)
            })
            
        }catch(error){
            console.log(error.message)
        }
    }
  

    const pageHandler=(number)=>{
        setloaded(false)
        setPage(number);
    }
    return(
        <div className="w-full h-96 mt-16 ">
           
           {loaded?(
                <div ref={booksCont} className='books flex flex-wrap justify-between  overflow-hidden'>
                        {Books.map(book=> <Book key={book.id+Math.random()} book={book} />)}
                </div>
           ):<Loader />}

           
           {loaded&&<Pagination setPageNumber={pageHandler} currentPage={Page} />}
        </div>
    )
}

export default Content;