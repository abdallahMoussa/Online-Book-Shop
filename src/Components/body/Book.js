import { Link } from 'react-router-dom';
import styles from './Book.module.css';
import {BookRate} from './BookRate' 

const Book = ({book})=>{
    var rate ;
    if(book["download_count"] >=0){
        rate =BookRate(book["download_count"])
    }
   
    return(
        <Link to={`/books/`+book.id} >
            <div className="book w-36 h-62 m-4 cursor-pointer">
                <div className="bookImage w-36 h-48 bg-black rounded-t-xl rounded-b-lg overflow-hidden shadow-lg hover:shadow-purple-400 hover:shadow-lg duration-500">
                    <img className='text-white' alt="Book Cover" src={book.formats["image/jpeg"]} width="100%" height="100%" />
                </div>
                <div className="bookDetails flex flex-col pt-1 h-auto">
                    <span className={`${styles.authorName } text-left font-bold text-purple-900 text-lg`}>{book.title?book.title:'Book Title'}</span>
                    <span className={`${styles.authorName } text-left font-bold text-slate-400 text-xs -mt-1`}>{book.authors[0]?book.authors[0].name:'Author`s Name'}</span>
                    <div className='rate flex -mt-1'>
                        {rate.map((star,i)=> star?<span key={i} className='text-xl text-yellow-400'>&#9733;</span>:<span key={i} className='text-xl text-slate-300'>&#9733;</span>)} 
                    </div>
                    
                </div>
            </div>
        </Link>
    );
}

export default Book;