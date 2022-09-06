import {Link} from 'react-router-dom'
import Book from './Book'

const Section = props=>{
    return(
        <div className="section">
            <div className='headline flex justify-between w-full mb-10 px-5 '>
                <h1 className='font-bold text-2xl text-left text-purple-900'>{props.name}</h1>
                <Link to={'/books'} className='text-slate-400 font-bold cursor-pointer hover:text-slate-800 duration-300'>View All</Link>
            </div>
            <div className='books w-full h-72 mb-24 flex flex-wrap overflow-hidden'>
                { props.books.length?props.books.map((b,i)=> <Book key={i} book={b} />):null }
            </div>
        </div>
    )
}

export default Section;