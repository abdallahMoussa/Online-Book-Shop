import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BookRate } from "./BookRate";
import Loader from "./Loader";

const BookPage = props=>{
    
    const [book,setBook] = useState({});
    const [bookCommit , setBookCommit] = useState(false)
    const [Liked,setLiked] = useState(false);
    const [loaded , setLoaded] = useState(false);
    const BookPageRef = useRef();
    const liked = useRef();
    const {bookId} = useParams();
    
    let rate = BookRate(book["download_count"])
    
    const likeHandler =()=>{
        let like = liked.current.getAttribute('alt')
        if(like =='disLike'){
            liked.current.setAttribute('alt','liked')
            setLiked(true)
        }else{
            liked.current.setAttribute('alt','disLike')
            setLiked(false)
        }
        actionHanddler('L')
    }
    async function isLiked(){
        try{
            const response = await fetch('https://react-backend-49bcf-default-rtdb.firebaseio.com/ReaderBooks.json')
            const data = await response.json()
            let userId = localStorage.getItem("userId");
            
            for(let key in data){
                // data[key] will be an object has {userid , booktitle , author , RDL stands for if book Read, Downloaded or Liked}

                if(data[key]['userId'] == userId){
                   if(data[key]['bookTitle']== book.title){                    
                     setLiked( data[key]['RDL'].includes('L'))
                   }
                }
            }
            setBookCommit(false)
        }catch(error){
            alert(error.message)
        }
    }
    async function actionHanddler(action){
        try{
            const response = await fetch('https://react-backend-49bcf-default-rtdb.firebaseio.com/ReaderBooks.json')
            const data = await response.json()
            let userId = localStorage.getItem("userId");
            let userExist = false;
            let bookExist = false;
            let patch = false
            for(let key in data){
                if(data[key]['userId'] == userId){
                    userExist = true
                   if(data[key]['bookTitle']== book.title){            
                        bookExist =true;
                        let updatedBook = {};
                        if(!data[key]['RDL'].includes(action) ){
                            updatedBook = data[key];
                            updatedBook['RDL']= updatedBook['RDL'] +action;
                            patch=true;
                            
                        }else if(action == 'L'){
                            updatedBook = data[key];
                            updatedBook['RDL']= updatedBook['RDL'].replace(/L/g, '')
                           
                            if(updatedBook['RDL'].length==0){
                                await fetch('https://react-backend-49bcf-default-rtdb.firebaseio.com/ReaderBooks/'+key+'/.json',{
                                                method:'DELETE',
                                                headers:{
                                                    'Content-Type':'application/json'
                                                }
                                            })
                            }else{
                                patch = true
                            }
                        } 
                        if(patch){
                            await fetch('https://react-backend-49bcf-default-rtdb.firebaseio.com/ReaderBooks/'+key+'/.json',{
                                method:'PATCH',
                                body: JSON.stringify(updatedBook),
                                headers:{
                                    'Content-Type':'application/json'
                                }
                            })
                        }
                        
                   }
                }
            }
            if(!userExist || !bookExist ){
                let LikedItem={
                    userId:localStorage.getItem("userId"),
                    bookTitle:book.title,
                    author:book.authors[0].name,
                    RDL:action
                }
                const response = await fetch('https://react-backend-49bcf-default-rtdb.firebaseio.com/ReaderBooks.json',{
                    method: 'POST',
                    body: JSON.stringify(LikedItem),
                    headers:{
                        'Content-Type':'application/json'
                    }
                })
            }

        }catch(error){
            alert(error.message)
        }
    } 
    async function getBook(){
        setLoaded(false)
        let urlLink = isNaN(bookId)? 'https://gutendex.com/books?search=':'https://gutendex.com/books?ids='
        try{
            fetch(urlLink+bookId)
            .then(response=>{
               if(!response.ok){
                   throw new Error('not found')
               }
               return response.json()})
            .then(data=>{
               let result = data.results;
               
               setBook(...result);
               setLoaded(true);
               setBookCommit(true);
           })
           
       }catch(error){
           console.log(error.message)
       }
    }
    
    useEffect(()=>{
        if(bookCommit){
            BookPageRef.current.classList.remove('fadeOut')
            BookPageRef.current.classList.add('fadeIn')
            isLiked()
        }else{
            getBook()
        }
    },[bookId,book])

   return<>
       {loaded&& (<div ref={BookPageRef} className="fadeOut BookPage w-full px-5 pt-10 flex flex-wrap justify-center mb-16" >
                    <div className="bookImg w-72 h-96 rounded-xl shadow-lg shadow-purple-800 bg-black overflow-hidden">
                        <img alt="book image" src={book.formats["image/jpeg"]} width="100%" />
                    </div>
                    <div className="details w-7/12 h-96 text-left pl-5 pt-4">
                        <h1 className="font-bold text-2xl text-purple-900">{book.title}</h1>
                        <h6 className="text-slate-500 text-xl my-5">{book.authors[0].name}</h6>
                        <div className='rate flex mb-5 '>
                                {rate.map((star,i)=> star?<span key={i} className='text-3xl text-yellow-400'>&#9733;</span>:<span key={i} className='text-3xl text-slate-300'>&#9733;</span>)} 
                        </div>
                        <span className="text-slate-700 ">{book.subjects.length?book.subjects[0].split('-')[0]:null}</span><br/><br/>
                        <span className="text-slate-500 font-bold  ">
                            Language : {book.languages[0]=='en'?'English': book.languages[0]}
                        </span>
                        <div className="actions pt-20 flex justify-end font-serif relative">
                            
                            <span ref={liked} onClick={likeHandler} alt={`${Liked?'liked':'disLike'}`} className={`text-4xl ${Liked?'text-purple-900' : 'text-slate-300'}  cursor-pointer hover:text-purple-600 duration-300 active:opacity-1 block mt-1 mr-5 active:text-black  left-0 `}>&#10084;</span>
                            
                            <a  target="_blank" href={book["formats"]["text/html"]} onClick={()=>actionHanddler('R')}
                                className="py-2 px-6 h-12 cursor-pointer bg-purple-800 rounded-md text-2xl mr-5 text-white hover:bg-purple-600">
                                Read
                            </a>
                            <a  target="_blank" href={book["formats"]["application/epub+zip"]} download onClick={()=>actionHanddler('D')}
                                className="py-2 h-12 px-6 cursor-pointer bg-slate-900 rounded-md text-2xl mr-5 text-white hover:bg-slate-600">
                                Download
                            </a>
                            {
                                !props.isLogin&&<>
                                    <div title="please login first" className="Lock w-96 h-16 -mt-2 absolute bg-white opacity-50 hover:cursor-not-allowed">
                                    </div>
                                    <Link to='/login'>
                                        <span className="absolute top-14 right-36 font-bold text-purple-800">Please Login First..</span>
                                    </Link>
                                </>
                            }

                        </div>
                    </div>
                </div>)
        }
        {!loaded&&<Loader />}
        </>
}
export default BookPage;
